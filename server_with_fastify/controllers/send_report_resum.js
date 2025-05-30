import "dotenv/config";
import { ReportGenerator } from "../utils/ReportGenerator.js";

export const sendToEmail = async (req, reply) => {
  const {
    userName,
    birthDate,
    schoolYear,
    amountAnswered,
    reportDataCorrects,
    amountCorrects,
    reportDataIncorrects,
    amountIncorrects,
    //email,
  } = req.body;

  try {
    const reportGenerator = new ReportGenerator(
      userName,
      birthDate,
      schoolYear,
      amountAnswered,
      //email,
      reportDataCorrects,
      amountCorrects,
      reportDataIncorrects,
      amountIncorrects
    );
    const pdfData = await reportGenerator.generatePDF();

    reply.header("Content-Type", "application/pdf");
    reply
      .header(
        "Content-Disposition",
        `attachment; filename='${userName}_relatorio.pdf'`
      )
      .code(200)
      .send(pdfData);
  } catch (error) {
    console.log(error);
    reply.code(500).send("Erro ao enviar relatório: " + error.message);
  }
};
