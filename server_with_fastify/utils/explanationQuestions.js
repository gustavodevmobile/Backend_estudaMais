import fetch from "node-fetch";

const HF_API_KEY = process.env.HF_API_KEY; // Substitua pela sua chave de API da Hugging Face

export async function generateExplanation(question, alternatives, image = null) {
  try {
    let prompt = `Pergunta: ${question}\nAlternativas: ${alternatives.join(", ")}\nExplique brevemente a resposta correta.`;

    if (image) {
      prompt = `Com base na imagem fornecida, ${prompt}`;
    }

    const response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API Hugging Face: ${response.statusText}`);
    }

    const data = await response.json();
    return data.generated_text;
  } catch (error) {
    console.error("Erro ao gerar explicação:", error);
    throw new Error("Não foi possível gerar a explicação.");
  }
}