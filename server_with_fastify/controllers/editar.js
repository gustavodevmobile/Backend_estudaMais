import fs from "fs/promises";
import "dotenv/config";
import Database from "../models/Questions.js";
import { readFileSync } from "fs";

export const editar_questao = async (req, reply) => {
  let oldImage;
  let newImage;
  try {
    const result = await Database.findByPk(req.body.id);
    oldImage = result.dataValues.image;

    if (!req.file.filename) {
      newImage = oldImage;
    } else {
      newImage = readFileSync(req.file.path);
    }
    await Database.update(
      {
        elementarySchool: req.body.elementarySchool,
        schoolYear: req.body.schoolYear,
        discipline: req.body.discipline,
        subject: req.body.subject,
        question: req.body.question,
        image: newImage,
        answer: req.body.answer,
        alternativeA: req.body.altA,
        alternativeB: req.body.altB,
        alternativeC: req.body.altC,
        alternativeD: req.body.altD,
        explanation: req.body.explanation,
      },
      { where: { id: req.body.id } }
    );
    reply.redirect("/");
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};

export const screen_editar_questao = async (req, reply) => {
  try {
    const result = await Database.findByPk(req.params.id);
    const imageBase64 = result.image.toString("base64");
    result.image = imageBase64;
    return reply.render("editar", {
      id: result.id,
      elementarySchool: result.elementarySchool,
      schoolYear: result.schoolYear,
      discipline: result.discipline,
      subject: result.subject,
      question: result.question,
      image: result.image,
      nameImageDir: result.nameImageDir,
      answer: result.answer,
      alternativeA: result.alternativeA,
      alternativeB: result.alternativeB,
      alternativeC: result.alternativeC,
      alternativeD: result.alternativeD,
      explanation: result.explanation,
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
