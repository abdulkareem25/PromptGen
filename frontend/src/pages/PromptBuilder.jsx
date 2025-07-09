import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowRight, FiCopy, FiSave, FiStar } from 'react-icons/fi';

const PersonaOption = ({ id, name, icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`flex flex-col items-center p-4 rounded-lg border ${
      active 
        ? 'border-indigo-500 bg-indigo-50' 
        : 'border-gray-200 hover:border-gray-300'
    }`}
  >
    <span className="text-2xl mb-2">{icon}</span>
    <span className="text-sm font-medium">{name}</span>
  </button>
);

const PromptBuilder = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('creativeWriter');
  const [qualityScore, setQualityScore] = useState(null);
  const [latency, setLatency] = useState(null);

  const personas = [
    { id: 'creativeWriter', name: 'Creative Writer', icon: '✍️' },
    { id: 'researchStudent', name: 'Researcher', icon: '📚' },
    { id: 'marketer', name: 'Marketer', icon: '📢' },
    { id: 'aiEnthusiast', name: 'AI Expert', icon: '🤖' },
  ];

  const handleSuggest = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/ai/suggest', {
        prompt: inputText,
        persona: selectedPersona,
        maxNewTokens: 100
      });
      setSuggestions(data.suggestions || []);
      setLatency(data.latency);
    } catch (err) {
      console.error('Suggestion error', err);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  const handleScorePrompt = async () => {
    if (!inputText.trim()) return;
    
    try {
      const { data } = await axios.post('/api/ai/score', { prompt: inputText });
      setQualityScore(data.score);
    } catch (err) {
      console.error('Scoring error', err);
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Prompt Builder</h1>
        <p className="mt-1 text-gray-600">Craft the perfect prompt with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Persona
            </label>
            <div className="grid grid-cols-4 gap-3">
              {personas.map(persona => (
                <PersonaOption
                  key={persona.id}
                  id={persona.id}
                  name={persona.name}
                  icon={persona.icon}
                  active={selectedPersona === persona.id}
                  onClick={setSelectedPersona}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Prompt Idea
            </label>
            <textarea
              rows="6"
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe what you want to create..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSuggest}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <FiArrowRight className="mr-2" />
              {isLoading ? 'Generating...' : 'Get Suggestions'}
            </button>
            
            <button
              onClick={handleScorePrompt}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <FiStar className="mr-2" />
              Score Quality
            </button>
          </div>

          {/* Quality Score */}
          {qualityScore !== null && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Prompt Quality</span>
                <span className="text-sm font-medium text-gray-700">{qualityScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    qualityScore >= 80 ? 'bg-green-500' : 
                    qualityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${qualityScore}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {qualityScore >= 80 ? 'Excellent! This prompt will likely produce great results.' : 
                 qualityScore >= 60 ? 'Good. Try adding more context for better results.' : 
                 'Needs improvement. Make your instructions more specific.'}
              </p>
            </div>
          )}
        </div>

        {/* Suggestions Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">AI Suggestions</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-800 mb-3">{suggestion}</p>
                  <div className="flex justify-between">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                      <FiCopy className="mr-1" /> Copy
                    </button>
                    <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                      <FiSave className="mr-1" /> Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Enter your prompt idea to get AI suggestions</p>
              <p className="text-sm mt-2">Suggestions will appear here</p>
            </div>
          )}
          
          {latency && !isLoading && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Generated in {latency}ms
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;