import "dotenv/config";
import nodemailer from "nodemailer";

export const sendToEmailFeedbackfailures = async (req, reply) => {
  const { message, descriptions } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "gucorrea.dev@outlook.com",
      subject: "Novo feedback recebido",
      text: "Teste de Envio de E-mail",
      html: `<h1>Feedback de Erro em questão</h1>
             <p>${message}</p>
             <h2>Descrição do Erro</h2>
             <p>${ descriptions }</p>`,
    };
    await transporter.sendMail(mailOptions);
    reply.code(200).send("Feedback da questão enviado com sucesso! Obrigado!");
    //console.log("E-mail enviado com sucesso!", result);
  } catch (error) {
    reply.code(500).send("Algo deu errado ao enviar o feedback da questão: " + error.message);
    console.error("Erro ao enviar e-mail:", error.message);
  }
};

export const sendToEmailFeedbackApp = async (req, reply) => {
  const { message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "gucorrea.dev@outlook.com",
      subject: "Novo feedback recebido",
      text: "Feedback sobre o App",
      html: `<h1>Feedback sobre o App</h1>
             <p>${message}</p>`,
    };
    await transporter.sendMail(mailOptions);
    reply.code(200).send("Feedback do app enviado com sucesso! Obrigado!");
    
  } catch (error) {
    reply.code(500).send("Algo deu errado ao enviar o feedback do app: " + error.message);
    console.error("Erro ao enviar e-mail:", error.message);
  }
};
