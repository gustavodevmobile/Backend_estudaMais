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
  console.log("req.file.filname", req.file.filename);
  console.log("req.file", req.file);

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
      //const file = await req.file();
      const imageDir = path.resolve(__dirname, "../images/");
      const imageDirD = path.resolve(__dirname, "../images/" + req.file.filename);

      if (!fs.existsSync(imageDirD)) {
        fs.mkdirSync(imageDirD, { recursive: true });
        console.log("Diretório criado:", imageDirD); 
      } else {
        console.log("Diretório já foi criado:", imageDirD);
      }

      //const imagePath = path.join(imageDir, req.file.filename);

      //fs.writeFileSync(imageDir, req.file.filename);
      //console.log(req.image.buffer)
      //const buffer = fs.readFileSync(imagePath); // Use req.file.buffer para salvar o arquivo
      const buffer = fs.readFileSync(imageDirD); // Use req.file.buffer para salvar o arquivo
      console.log("buffer", buffer);
      const image = buffer;
      //console.log("Imagem salva:", imagePath);

      // Use o buffer da imagem

      const filename = req.file.filename;
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
