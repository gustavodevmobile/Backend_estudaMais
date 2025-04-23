import { readFileSync } from "fs";
import "dotenv/config";
import Database from "../models/Questions.js";

export const screen_cadastrar_questao = async (req, reply) => {
  return await reply.render("cadastrar");
};

export const cadastrar_questao = async function (req, reply) {
  let image;

  try {
    console.log('req.file.filename', req.file.filename);
    const file = req.file;
    if (!req.file.filename) {
      console.log("Nenhum arquivo enviado.");
      image = "sem imagem";
    } else {
      console.log("Arquivo recebido:", file);
      image = readFileSync(file.path); // Lê o arquivo diretamente do stream
      console.log("image", image);
    }

    await Database.create({
      elementarySchool: req.body.elementarySchool,
      schoolYear: req.body.schoolYear,
      displice: req.body.displice,
      subject: req.body.subject,
      question: req.body.question,
      image: image,
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
};
// Obtenha o arquivo enviado
