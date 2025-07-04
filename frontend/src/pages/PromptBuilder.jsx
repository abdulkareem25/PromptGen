import React, { useState } from 'react';
import axios from 'axios';

const PromptBuilder = () => {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [latency, setLatency] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);

  // 1️⃣ Generate GPT‑2 suggestion
  const handleSuggest = async () => {
    try {
      const { data } = await axios.post('/api/ai/suggest', {
        prompt: inputText,
        maxNewTokens: 50
      });
      setSuggestion(data.text);
      setLatency(data.latency);
    } catch (err) {
      console.error('Suggestion error', err);
    }
  };

  // 2️⃣ Zero‑shot score/tag
  const handleScore = async () => {
    try {
      const { data } = await axios.post('/api/ai/score', {
        prompt: inputText
      });
      setScoreResult(data);
    } catch (err) {
      console.error('Scoring error', err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <textarea
        rows="4"
        className="w-full border p-2"
        placeholder="Type your prompt here…"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />

      <div className="flex space-x-2">
        <button
          onClick={handleSuggest}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Generate Suggestion
        </button>
        <button
          onClick={handleScore}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Score & Tag
        </button>
      </div>

      {suggestion && (
        <div className="border p-3">
          <h4 className="font-semibold">Suggestion:</h4>
          <p>{suggestion}</p>
          <p className="text-sm text-gray-500">Latency: {latency} ms</p>
        </div>
      )}

      {scoreResult && (
        <div className="border p-3">
          <h4 className="font-semibold">Quality Scores:</h4>
          {scoreResult.labels.map((label, i) => (
            <p key={label}>
              {label}: {(scoreResult.scores[i] * 100).toFixed(1)}%
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptBuilder;
