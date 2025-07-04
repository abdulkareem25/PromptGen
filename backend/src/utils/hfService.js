const axios = require('axios');

// Base config for HF Inference API
const HF_API_URL = 'https://api-inference.huggingface.co/models';
const HF_HEADERS = {
  Authorization: `Bearer ${process.env.HF_API_KEY}`,
  'Content-Type': 'application/json'
};

/**
 * Get a text‑generation suggestion from GPT‑2
 * @param {string} prompt
 * @param {number} maxNewTokens
 * @returns {Promise<string>}
 */
async function getGpt2Suggestion(prompt, maxNewTokens = 50) {
  try {
    const payload = { inputs: prompt, parameters: { max_new_tokens: maxNewTokens } };
    const start = Date.now();
    const res = await axios.post(`${HF_API_URL}/gpt2`, payload, { headers: HF_HEADERS });
    const latency = Date.now() - start;
    const text = Array.isArray(res.data) ? res.data[0].generated_text : '';
    return { text, latency };
  } catch (err) {
    console.error('getGpt2Suggestion error:', err.response?.data || err.message);
    throw err;
  }
}

/**
 * Score a prompt via zero‑shot classification (clear vs unclear)
 * @param {string} promptText
 * @returns {Promise<Object>} e.g. { labels: [...], scores: [...] }
 */
async function scorePromptZeroShot(promptText) {
  const payload = {
    inputs: promptText,
    parameters: { candidate_labels: ['clear', 'unclear'] }
  };
  const res = await axios.post(
    `${HF_API_URL}/facebook/bart-large-mnli`,
    payload,
    { headers: HF_HEADERS }
  );
  return res.data; 
}

module.exports = { getGpt2Suggestion, scorePromptZeroShot };
