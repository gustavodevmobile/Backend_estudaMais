import fs from "fs";

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
  // let image;
  // let filename;

  //console.log('req.file', req.file)
  // if (!req.file || !req.file.filename) {
  //   req.body.image = "sem imagem";
  //   image = req.body.image;
  //   filename = null;
  // } else {
  //   try {
  //     const imagePath = path.resolve(__dirname + "../images/" + req.file.filename);
  //     if (!fs.existsSync(imagePath)) {
  //       fs.mkdirSync(imagePath, { recursive: true });
  //       console.log("Diretório criado:", imagePath);
  //     }else{
  //       console.log("Diretório já foi criado:", imagePath);
  //     }
      
  //     // console.log(imagePath);

  //     image = fs.readFileSync(imagePath);
  //     //const file = req.file();
  //    // image = await file.toBuffer(); 
  //     filename = req.file.filename;
  //   } catch (e) {
  //     console.error(`Erro ao salvar a imagem: ${e}`);
  //     return reply.code(500).send({ error: `Erro ao salvar iamgem ${e}` });
  //   }
  // }
  // Obtenha o arquivo enviado
  try{
  const file = await req.file();
  if (!file) {
    return reply.code(400).send({ error: "Nenhum arquivo enviado" });
  }

  // Defina o nome do arquivo
  const filename = `${Date.now()}-${file.filename}`; // Gera um nome único baseado no timestamp
  const uploadDir = path.resolve(__dirname, "../images"); // Diretório de upload

  // Cria o diretório, se necessário
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Caminho completo do arquivo (incluindo o nome do arquivo)
  const filePath = path.join(uploadDir, filename);

  // Salve os dados do arquivo no caminho especificado
  const buffer = await file.toBuffer();
  fs.writeFileSync(filePath, buffer);

  console.log("Imagem salva com sucesso em:", filePath);

  // Responda com sucesso
  reply.code(201).send({ message: "Imagem salva com sucesso!", path: filePath });
} catch (err) {
  console.error("Erro ao salvar a imagem:", err);
  reply.code(500).send({ error: "Erro ao salvar o arquivo" });
}
  try {
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
    console.log("Cadastrado com sucesso");
    return reply.redirect("/");
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
