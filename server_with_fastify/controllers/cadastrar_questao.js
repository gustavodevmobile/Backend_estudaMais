import { readFileSync } from "fs";
import "dotenv/config";
import Database from "../models/Questions.js";

export const screen_cadastrar_questao = async (req, reply) => {
  return await reply.render("cadastrar");
};

export const cadastrar_questao = async function (req, reply) {
  let image;
  try {
    // Recebe o arquivo enviado
    const file = req.file;
    // Verifica se o arquivo foi enviado
    if (!req.file.filename) {
      // Se não houver arquivo, defina uma imagem padrão
      image = "sem imagem";
    } else {
      // Se houver arquivo, leia o arquivo diretamente do stream
      image = readFileSync(file.path); 
    }
// Salva a imagem no banco de dados
    await Database.create({
      elementarySchool: req.body.elementarySchool,
      schoolYear: req.body.schoolYear,
      discipline: req.body.discipline,
      subject: req.body.subject,
      question: req.body.question,
      image: image,
      answer: req.body.answer,
      alternativeA: req.body.altA,
      alternativeB: req.body.altB,
      alternativeC: req.body.altC,
      alternativeD: req.body.altD,
      explanation: req.body.explanation,
    });
    console.log("Questão com imagem salva com sucesso:");
    return reply.redirect("registrar");
  } catch (e) {
    console.error(`Erro ao salvar a imagem: ${e}`);
    return reply.code(500).send({ error: `Erro ao salvar iamgem ${e}` });
  }
};

