import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    // Establish a robust list of candidate models in case one experiences 503 high demand
    const requestedModel = model || "gemini-3.5-flash";
    const fallbackModels = [
      requestedModel,
      "gemini-3.5-flash",
      "gemini-2.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3-flash-preview",
    ];

    // Filter duplicates while keeping the original preference order
    const uniqueModelsToTry = Array.from(new Set(fallbackModels));

    let lastError = null;

    for (const currentModel of uniqueModelsToTry) {
      try {
        console.log(`Attempting Gemini generation with model: ${currentModel}`);
        const response = await ai.models.generateContent({
          model: currentModel,
          contents: prompt,
        });
        if (response && response.text) {
          console.log(`Successfully generated content using model: ${currentModel}`);
          return NextResponse.json({ text: response.text });
        }
      } catch (err: any) {
        console.warn(`Model ${currentModel} encountered an issue:`, err?.message || err);
        lastError = err;
        // Try the next model in our fallback list
      }
    }

    // Exhausted fallback models
    console.error("All Gemini API models failed. Last Error:", lastError);
    return NextResponse.json(
      { 
        error: "All Gemini models are currently experiencing high demand. Please try again in a few moments.",
        details: lastError?.message || String(lastError)
      },
      { status: 503 }
    );
  } catch (error: any) {
    console.error("Gemini API Route critical error:", error);
    return NextResponse.json(
      { error: "Failed to generate content due to route error", details: error?.message || String(error) },
      { status: 500 },
    );
  }
}
