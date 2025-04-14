import "dotenv/config";
import nodemailer from "nodemailer";
import pdf from "pdfkit";
import { ReportGenerator } from "../utils/ReportGenerator.js";

export const sendToEmail = async (req, reply) => {
  const {
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
    console.error("Erro ao enviar e-mail:", error.message);
  }
};
