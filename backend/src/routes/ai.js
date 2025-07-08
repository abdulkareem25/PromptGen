// backend/src/routes/ai.js
const express = require('express');
const router = express.Router();
const { getTextSuggestion, scorePromptQuality, generateTemplateSchema } = require('../utils/hfService');

// POST /api/ai/suggest
router.post('/suggest', async (req, res) => {
  const { prompt, persona = 'creativeWriter', maxNewTokens } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const { text, latency } = await getTextSuggestion(prompt, persona, maxNewTokens);
    res.json({ text, latency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Prompt quality scoring
router.post('/score', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const qualityReport = await scorePromptQuality(prompt);
    res.json(qualityReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
