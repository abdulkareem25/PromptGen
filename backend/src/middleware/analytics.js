import Prompt from '../models/prompt.model.js';

export async function trackPromptAnalytics(req, res, next) {
  const start = Date.now();
  
  // Capture response data
  res.on('finish', async () => {
    try {
      if (req.user && req.body.prompt && res.statusCode === 200) {
        const latency = Date.now() - start;
        
        // Get quality score if available
        let qualityScore = null;
        if (res.locals.qualityScore) {
          qualityScore = res.locals.qualityScore;
        }
        
        // Create analytics record
        const promptRecord = new Prompt({
          userId: req.user.userId,
          text: req.body.prompt,
          usageMetrics: {
            endpoint: req.path,
            method: req.method,
            statusCode: res.statusCode,
            latency,
            qualityScore
          }
        });
        
        await promptRecord.save();
      }
    } catch (err) {
      console.error("Analytics tracking error:", err);
    }
  });
  
  next();
}