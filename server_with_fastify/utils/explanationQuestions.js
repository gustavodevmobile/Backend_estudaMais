import { InferenceClient } from "@huggingface/inference";

const HF_API_KEY = process.env.HF_API_KEY; // Substitua pela sua chave de API da Hugging Face
const client = new InferenceClient(HF_API_KEY);

function formatExplanation(rawExplanation) {
  try {
    // Divida a explicação em linhas
    const lines = rawExplanation.split("\n");

    // Crie um objeto estruturado
    const formattedExplanation = {
      explanation: [],
      conclusion: "",
    };

    // Itere pelas linhas para identificar as partes
    lines.forEach((line) => {
      if (line.startsWith("- **")) {
        // Adicione as partes explicativas
        formattedExplanation.explanation.push(line.trim());
      } else if (line.startsWith("Portanto")) {
        // Adicione a conclusão
        formattedExplanation.conclusion = line.trim();
      }
    });

    return formattedExplanation;
  } catch (error) {
    console.error("Erro ao formatar explicação:", error);
    throw new Error("Não foi possível formatar a explicação.");
  }
}

export async function generateExplanation(
  question,
  alternatives,
  image = null
) {
  try {
    let prompt = `Responda a questão em português, com um breve resumo, e indique qual alternativa correta. questão: ${question}, alternativas: ${alternatives}`;
    console.log("Prompt:", prompt);

    if (image) {
      prompt = `Com base na imagem fornecida ${image}, ${prompt}`;
    }

    let response = await client.chatCompletion({
      provider: "together",
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      parameters: {
        temperature: 0.7,
        max_new_tokens: 200,
      },
    });

    // if (!response || !response.choices || !response.choices[0]) {
    //   throw new Error("Resposta inválida da API Hugging Face.");
    // }
    // const rawExplanation = response.choices[0].message.content;

    // // Formatar a explicação como objeto estruturado
    // const formattedExplanation = formatExplanation(rawExplanation);
    console.log("Explicação formatada:", response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao gerar explicação:", error);
    throw new Error("Não foi possível gerar a explicação.");
  }
}
