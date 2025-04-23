import fs from "fs";
//import fsp from "fs/promises";
import "dotenv/config";
import Database from "../models/Questions.js";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const screen_cadastrar_questao = async (req, reply) => {
  return await reply.render("cadastrar");
};

export const cadastrar_questao = async function (req, reply) {
  let image;
  let filename
  if (!req.file || !req.file.filename) {
    req.body.image = "sem imagem";
    const image = req.body.image;
    const filename = null;

    await Database.create({
      elementarySchool: req.body.elementarySchool,
      schoolYear: req.body.schoolYear,
      displice: req.body.displice,
      subject: req.body.subject,
      question: req.body.question,
      image: image,
      nameImageDir: filename,
      answer: req.body.answer,
      alternativeA: req.body.altA,
      alternativeB: req.body.altB,
      alternativeC: req.body.altC,
      alternativeD: req.body.altD,
    });
    console.log("Questão sem imagem salva com sucesso:");
    return reply.redirect("/");
  } else {
    try {
      const imageDir = path.resolve(__dirname, "../images/" + req.file.filename);

      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
        console.log("Diretório criado:", imageDir);
        fs.writeFileSync(imageDir, req.file.filename);
        image = fs.readFileSync(imageDir); 
        filename = req.file.filename;// Use req.file.buffer para salvar o 
      } else {
        image = fs.readFileSync(imageDir); // Use req.file.buffer para salvar o 
        filename = req.file.filename;// Use req.file.buffer para salvar o 
        console.log("Diretório já foi criado:", imageDir);
      }

      
      console.log("image", image);
      console.log("filename", filename);

      // Use o buffer da imagem

      
      await Database.create({
        elementarySchool: req.body.elementarySchool,
        schoolYear: req.body.schoolYear,
        displice: req.body.displice,
        subject: req.body.subject,
        question: req.body.question,
        image: image,
        nameImageDir: filename,
        answer: req.body.answer,
        alternativeA: req.body.altA,
        alternativeB: req.body.altB,
        alternativeC: req.body.altC,
        alternativeD: req.body.altD,
      });
      console.log("Questão com imagem salva com sucesso:");
      return reply.redirect("/");
    } catch (e) {
      console.error(`Erro ao salvar a imagem: ${e}`);
      return reply.code(500).send({ error: `Erro ao salvar iamgem ${e}` });
    }
  }
  // Obtenha o arquivo enviado
};
