// backend/src/routes/ai.js
const express = require('express');
const router = express.Router();
const { getTextSuggestion, scorePromptQuality, generateTemplateSchema } = require('../utils/hfService');

// POST /api/ai/suggest
router.post('/suggest', async (req, res) => {
  try {
    const { prompt, persona, maxNewTokens } = req.body;
    const { suggestions, latency } = await getTextSuggestion(
      prompt, 
      persona || 'aiEnthusiast', 
      maxNewTokens || 512
    );
    
    res.json({ suggestions, latency });
  } catch (error) {
    console.error('Suggest route error:', error);
    res.status(500).json({ 
      error: error.message || 'AI suggestion failed',
      suggestions: []
    });
  }
});

// POST /api/ai/score
router.post('/score', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await scorePromptQuality(prompt);
    res.json(result);
  } catch (error) {
    console.error('Score route error:', error);
    res.status(500).json({ 
      error: error.message || 'Prompt scoring failed',
      score: 0
    });
  }
});

// Template generation
router.post('/generate-template', async (req, res) => {
  const { description } = req.body;
  if (!description) return res.status(400).json({ error: 'description is required' });

  try {
    const template = await generateTemplateSchema(description);
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
