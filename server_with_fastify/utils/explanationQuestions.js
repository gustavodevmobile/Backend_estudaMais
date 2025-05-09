import { HfApi } from "@huggingface/hub";
import "dotenv/config";

const HF_API_KEY = process.env.HF_API_KEY; // Substitua pela sua chave da Hugging Face
const api = new HfApi();

export async function generateExplanation(question, alternatives, image = null) {
  try {
    let prompt = `Pergunta: ${question}\nAlternativas: ${alternatives.join(", ")}\nExplique brevemente a resposta correta.`;

    // Se houver uma imagem, inclua no prompt
    if (image) {
        const base64Image = Buffer.from(image).toString("base64");
        prompt = `Com base na imagem fornecida (Base64): ${base64Image}, ${prompt}`;
    }

    // Faz a chamada ao modelo de linguagem
    const response = await api.textGeneration({
      model: "EleutherAI/gpt-neo-2.7B", // Modelo usado para geração de texto
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
      },
      token: process.env.HF_API_KEY, // Passa o token de autenticação
    });
    console.log("Resposta do modelo:", response.generated_text);
    return response.generated_text;
  } catch (error) {
    console.error("Erro ao gerar explicação:", error);
    throw new Error("Não foi possível gerar a explicação.");
  }
}