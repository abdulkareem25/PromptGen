// backend/src/utils/hfService.js

const { InferenceClient } = require("@huggingface/inference");
const client = new InferenceClient(process.env.HF_API_KEY);

// /**
//  * Tailors the system prompt based on persona.
//  */
// const personaSystemMessages = {
//   creativeWriter: "You are a creative writing assistant. Provide fresh story starters and character ideas.",
//   researchStudent: "You are an academic assistant. Generate structured essay or research prompts.",
//   marketer: "You are a marketing copywriter. Craft engaging ad copy and social‑media hooks.",
//   aiEnthusiast: "You are an AI prompt engineering expert. Suggest best‑practice prompt refinements."
// };

/**
 * Get a text‑generation suggestion from DeepSeek-R1 via HF InferenceClient
 * @param {string} userPrompt    – the raw prompt text from user
 * @param {"creativeWriter"|"researchStudent"|"marketer"|"aiEnthusiast"} persona
 * @param {number} maxNewTokens
 * @returns {Promise<{ text: string, latency: number }>}
 */
// async function getTextSuggestion(userPrompt, persona = "creativeWriter", maxNewTokens = 512) {
//   try {
//     // Enhanced persona-based instructions
//     const personaInstructions = {
//       creativeWriter: `You're a creative writing assistant. Suggest 3-5 prompt variations that spark imagination. Focus on: character development, plot twists, and vivid settings.`,
//       researchStudent: `You're an academic research assistant. Suggest structured prompts with: thesis statements, research questions, and methodology suggestions.`,
//       marketer: `You're a marketing expert. Suggest prompts for: ad copy variations, social media hooks, and customer engagement strategies.`,
//       aiEnthusiast: `You're a prompt engineering expert. Suggest optimizations for: clarity, specificity, and AI model compatibility.`
//     };

//     const start = Date.now();

//     // Enhanced prompt with context and constraints
//     const messages = [
//       { role: "system", content: personaInstructions[persona] },
//       { role: "user", content: `Original prompt: "${userPrompt}"\n\nSuggest improvements and variations:` }
//     ];

//     const response = await client.chatCompletion({
//       provider: "novita",
//       model: "deepseek-ai/DeepSeek-R1",
//       messages,
//       max_tokens: maxNewTokens,
//       temperature: 0.7,
//       top_p: 0.9
//     });

//     const latency = Date.now() - start;
//     const rawText = response.choices?.[0]?.message?.content?.trim() || "";
//     console.log(rawText)

//     // Parse suggestions into array
//     const suggestions = rawText.split('\n')
//       .filter(line => line.trim().length > 0)
//       .map(line => line.replace(/^\d+[\.\)]?\s*/, '').trim());
//       console.log(suggestions)

//     return { suggestions, latency };

//   } catch (err) {
//     console.error("Enhanced getTextSuggestion error:", err);
//     throw new Error("AI suggestion service unavailable");
//   }
// }


const TEXT_GEN_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // Better at following instructions

async function getTextSuggestion(userPrompt, persona = "aiEnthusiast", maxNewTokens = 512) {
  try {
    const personaInstructions = {
      aiEnthusiast: `As an AI expert, suggest 3-5 optimized prompt variations. Format: ["var1", "var2"]`,
      creativeWriter: `As a creative writing assistant, suggest 3-5 concise prompt variations focusing on character, setting, and plot. Format: ["var1", "var2"]`,
      researchStudent: `As a research assistant, suggest 3-5 structured prompts with clear objectives. Format: ["var1", "var2"]`,
      marketer: `As a marketing expert, suggest 3-5 engaging prompts for campaigns. Format: ["var1", "var2"]`,
    };

    const start = Date.now();

    const response = await client.chatCompletion({
      provider: "together",
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Better at following instructions
      messages: [
        {
          role: "system",
          content: `${personaInstructions[persona]} Return ONLY a JSON array of strings.`
        },
        {
          role: "user",
          content: `Original prompt: "${userPrompt}"`
        }
      ],
      max_tokens: maxNewTokens,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const latency = Date.now() - start;

    // Handle empty response
    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error("Empty response from AI model");
    }

    const content = response.choices[0].message.content.trim();
    console.log("Raw AI response:", content); // For debugging

    // Parse and return suggestions
    let suggestions = [];
    try {
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        suggestions = parsed;
      } else if (parsed.suggestions) {
        suggestions = parsed.suggestions;
      } else if (parsed.variations) {
        suggestions = parsed.variations;
      } else {
        suggestions = extractSuggestionsFromText(content);
      }
    } catch (e) {
      suggestions = extractSuggestionsFromText(content);
    }

    return { suggestions, latency };

  } catch (err) {
    console.error("getTextSuggestion error:", err);
    return { suggestions: [], latency: 0, error: err.message };
  }
}


// Fine-tuned model for prompt quality assessment
const PROMPT_QUALITY_MODEL = "distilbert-base-uncased"; // Replace with your fine-tuned model

async function scorePromptQuality(prompt) {
  try {
    const response = await client.textClassification({
      model: PROMPT_QUALITY_MODEL,
      inputs: prompt
    });

    // Assuming model returns scores for [Poor, Fair, Good, Excellent]
    const scores = response[0]?.scores || [0.2, 0.2, 0.3, 0.3];
    const qualityLabels = ['Poor', 'Fair', 'Good', 'Excellent'];

    // Calculate weighted score (0-100)
    const weightedScore = Math.round(scores.reduce((sum, score, i) => sum + (score * (i + 1) * 25), 0));

    return {
      score: weightedScore,
      category: qualityLabels[scores.indexOf(Math.max(...scores))],
      feedback: generateQualityFeedback(weightedScore)
    };

  } catch (err) {
    console.error("Prompt scoring error:", err);
    return { score: 0, category: 'Unknown', feedback: 'Scoring unavailable' };
  }
}

function generateQualityFeedback(score) {
  if (score >= 90) return "Excellent prompt! Clear, specific, and likely to produce high-quality AI responses.";
  if (score >= 70) return "Good prompt. Consider adding more context or constraints for better results.";
  if (score >= 50) return "Fair prompt. Try specifying the desired output format or length.";
  return "Needs improvement. Make your prompt more specific and provide clearer instructions.";
}

async function generateTemplateSchema(userDescription) {
  try {
    const response = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "system",
          content: `You're an AI template designer. Create a JSON template based on user needs with fieldsSchema and defaultValues.`
        },
        {
          role: "user",
          content: `Create a prompt template for: "${userDescription}". 
          Output ONLY valid JSON with: title, category, description, fieldsSchema (object with field names containing type and description), 
          and defaultValues (object).`
        }
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const jsonString = response.choices?.[0]?.message?.content?.trim();
    if (!jsonString) throw new Error("Empty response from AI");

    const template = JSON.parse(jsonString);

    // Basic validation
    if (!template.title || !template.fieldsSchema) {
      throw new Error("Invalid template structure");
    }

    return template;

  } catch (err) {
    console.error("Template generation error:", err);
    throw new Error("Failed to generate template");
  }
}

module.exports = {
  getTextSuggestion, generateTemplateSchema, scorePromptQuality
};
