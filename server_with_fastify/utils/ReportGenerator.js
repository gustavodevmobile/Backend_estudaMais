import nodemailer from "nodemailer";
//import pdf from "pdfkit";
import pdfMake from "pdfmake/build/pdfmake.js";
import vfs from "pdfmake/build/vfs_fonts.js";

pdfMake.vfs = vfs; 

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
    const docDefinition = {
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
        },
        subheader: {
          fontSize: 14,
          margin: [0, 5, 0, 5],
        },
        tableHeader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10],
          alignment: "center"
        },
        bodyHeader: {
          fontSize: 12,
          bold: true,
          alignment: "center",
        },
      },
      content: [
        { text: "Resumo de Desempenho", style: "header" },
        { text: "\n" },
        { text: `Enviado para: ${this.email}`, style: "subheader" },
        { text: `Usuário: ${this.userName}`, style: "subheader" },
        { text: `Data de Nascimento: ${this.birthDate}`, style: "subheader" },
        { text: `Ano Escolar: ${this.schoolYear}`, style: "subheader" },
        { text: `Total de Respondidas: ${this.amountAnswered}`, style: "subheader" },
        { text: `Quantidade de Corretas: ${this.amountCorrects}`, style: "subheader" },
        { text: `Quantidade de Incorretas: ${this.amountIncorrects}`, style: "subheader" },
        { text: "\n" },

        { text: "Questões Respondidas Corretamente", style: "tableHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"],
            body: [
              [
                { text: "Ano Escolar", style: "bodyHeader" },
                { text: "Disciplina", style: "bodyHeader" },
                { text: "Assunto", style: "bodyHeader" },
                { text: "Data", style: "bodyHeader" },
                { text: "Hora", style: "bodyHeader" },
              ], // Cabeçalhos, 
              ...this.reportDataCorrects.map((item) => [
                item.schoolYear,
                item.discipline,
                item.subject,
                item.date,
                item.hours,
              ]),
            ],
          },
        },
        { text: "\n" },
        { text: "Questões Respondidas Incorretamente", style: "tableHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*"],
            body: [
              [
                { text: "Ano Escolar", style: "bodyHeader" },
                { text: "Disciplina", style: "bodyHeader" },
                { text: "Assunto", style: "bodyHeader" },
                { text: "Data", style: "bodyHeader" },
                { text: "Hora", style: "bodyHeader" },
              ], // Cabe
              ...this.reportDataIncorrects.map((item) => [
                item.schoolYear,
                item.discipline,
                item.subject,
                item.date,
                item.hours,
              ]),
            ],
          },
        },
      ],
      
    };

    return new Promise((resolve, reject) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBuffer((buffer) => {
        resolve(buffer);
      });
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