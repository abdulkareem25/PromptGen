const express = require('express');
const router = express.Router();
const { getGpt2Suggestion, scorePromptZeroShot } = require('../utils/hfService');

// POST /api/ai/suggest
router.post('/suggest', async (req, res) => {
  try {
    const { prompt, maxNewTokens } = req.body;
    const result = await getGpt2Suggestion(prompt, maxNewTokens);
    res.json(result);  // { text, latency }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Suggestion failed' });
  }
});

// POST /api/ai/score
router.post('/score', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await scorePromptZeroShot(prompt);
    res.json(result);  // { labels: [...], scores: [...] }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Scoring failed' });
  }
});

module.exports = router;
