import fs from "fs";

import "dotenv/config";
import Database from "../database/database.js";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const screen_cadastrar_questao = async (req, reply) => {
  return await reply.render("templates/cadastrar");
};

export const cadastrar_questao = async function (req, reply) {
  const imagePath = path.resolve(__dirname, "../images/" + req.file.filename);
  let image;
  let filename;
  //console.log("req.file.filename", req.file.filename);
  if (!req.file || !req.file.filename) {
    req.body.image = "sem imagem";
    image = req.body.image;
    filename = null;
  } else {
    image = fs.readFileSync(imagePath);
    filename = req.file.filename;
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

