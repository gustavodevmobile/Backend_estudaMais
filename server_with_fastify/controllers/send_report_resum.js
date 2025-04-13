import "dotenv/config";
import nodemailer from "nodemailer";
import pdf from "pdfkit";

export const sendToEmail = async (req, reply) => {
  const { reportCorrects, reportIncorrects, email } = req.body;
  try {
    const doc = new pdf();
    const pdfBuffer = [];
    doc.on("data", (chunk) => pdfBuffer.push(chunk));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(pdfBuffer);
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Relatório de resumo de questões",
        text: "Envio de relatório de desempenho",
        attachments: [
          {
            filename: "relatorio.pdf",
            content: pdfData,
          },
        ],
      };
      await transporter.sendMail(mailOptions);
      reply.code(200).send("Relatório enviado com sucesso!");
    });

    doc.text("Relatório de Corretas");
    doc.moveDown();
    reportCorrects.forEach((item) => {
      doc.text(`Ano Escolar: ${item.schoolYear}`);
      doc.text(`Disciplina: ${item.discipline}`);
      doc.text(`Assunto: ${item.subject}`);
      doc.text(`Data: ${item.date}`);
      doc.text(`Hora: ${item.hours}`);
      doc.moveDown();
    });
    reportIncorrects.forEach((item) => {
        doc.text(`Ano Escolar: ${item.schoolYear}`);
        doc.text(`Disciplina: ${item.discipline}`);
        doc.text(`Assunto: ${item.subject}`);
        doc.text(`Data: ${item.date}`);
        doc.text(`Hora: ${item.hours}`);
        doc.moveDown();
      });
    doc.end();
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    reply
      .code(500)
      .send("Algo deu errado ao enviar o feedback: " + error.message);
    console.error("Erro ao enviar e-mail:", error.message);
  }
};
