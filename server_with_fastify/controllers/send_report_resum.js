import "dotenv/config";
import { ReportGenerator } from "../utils/ReportGenerator.js";

export const sendToEmail = async (req, reply) => {
  const {
    userName,
    birthDate,
    schoolYear,
    reportDataCorrects,
    amountCorrects,
    reportDataIncorrects,
    amountIncorrects,
    email,
  } = req.body;

  if (!email) {
    reply.send("Email não informado");
  }

  try {
    const reportGenerator = new ReportGenerator(
      userName,
      birthDate,
      schoolYear,
      email,
      reportDataCorrects,
      amountCorrects,
      reportDataIncorrects,
      amountIncorrects
    );
    const pdfData = await reportGenerator.generatePDF();
    await reportGenerator.sendEmail(pdfData);

    reply.code(200).send("Relatório enviado com sucesso!");
  } catch (error) {
    reply.code(500).send("Erro ao enviar relatório: " + error.message);
  }
};
