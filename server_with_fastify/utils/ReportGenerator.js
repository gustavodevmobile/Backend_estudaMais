// filepath: c:\Users\Gamer\Documents\Projetos\Backend_Flutter\Backend_estudaMais\server_with_fastify\utils\ReportGenerator.js
import nodemailer from "nodemailer";
import pdf from "pdfkit";

export class ReportGenerator {
  constructor(userName, birthDate, schoolYear, amountAnswered ,email, reportDataCorrects, amountCorrects, reportDataIncorrects, amountIncorrects) {
    this.userName = userName;
    this.birthDate = birthDate;
    this.schoolYear = schoolYear;
    this.amountAnswered = amountAnswered;
    this.email = email;
    this.reportDataCorrects = reportDataCorrects;
    this.amountCorrects = amountCorrects;
    this.reportDataIncorrects = reportDataIncorrects;
    this.amountIncorrects = amountIncorrects;
    this.pdfBuffer = [];
  }

  async generatePDF() {
    const doc = new pdf();

    doc.on("data", (chunk) => this.pdfBuffer.push(chunk));
    doc.on("end", () => console.log("PDF gerado com sucesso!"));

    doc.fontSize(25).fillColor("blue").text("Resumo de Desempenho", { align: "center" });

    doc.fillColor("black").moveDown();
    
    doc.fontSize(20).text(`Usuário: ${this.userName}`);

    doc.fontSize(18).text(`Data de Nascimento: ${this.birthDate}`);
    
    doc.fontSize(18).text(`Ano Escolar: ${this.schoolYear}`);

    doc.fontSize(20).text(`Total de respondidas: ${this.amountAnswered}`);
    doc.fontSize(16).text(`Quantidade de Corretas: ${this.amountCorrects}`);
    doc.fontSize(16).text(`Quantidade de Incorretas: ${this.amountIncorrects}`);
    doc.moveDown();

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(20).fillColor("blue").text("Questões respondidas corretamente", { align: "center" });
    doc.fillColor("black").moveDown();

    if (Array.isArray(this.reportDataCorrects)) {
      this.reportDataCorrects.forEach((item) => {
        doc.text(`Ano Escolar: ${item.schoolYear}`);
        doc.text(`Disciplina: ${item.discipline}`);
        doc.text(`Assunto: ${item.subject}`);
        doc.text(`Data: ${item.date}`);
        doc.text(`Hora: ${item.hours}`);
        doc.moveDown();
      });
    } else {
      doc.text("Nenhum dado disponível para corretas.");
      doc.moveDown();
    }

    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(20).fillColor("blue").text("Questões respondidas incorretamente", { align: "center" });
    doc.fillColor("black").moveDown();

    if (Array.isArray(this.reportDataIncorrects)) {
      this.reportDataIncorrects.forEach((item) => {
        doc.text(`Ano Escolar: ${item.schoolYear}`);
        doc.text(`Disciplina: ${item.discipline}`);
        doc.text(`Assunto: ${item.subject}`);
        doc.text(`Data: ${item.date}`);
        doc.text(`Hora: ${item.hours}`);
        doc.moveDown();
      });
    } else {
      doc.text("Nenhum dado disponível para incorretas.");
      doc.moveDown();
    }

    doc.end();
    return new Promise((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(this.pdfBuffer)));
    });
  }

  async sendEmail(pdfData) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: this.email,
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
    console.log("E-mail enviado com sucesso!");
  }
}