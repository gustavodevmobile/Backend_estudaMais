//import multer from "fastify-multer";
import fsSync, { access } from "fs";
import fs from "fs/promises";
import "dotenv/config";
import Database from "../models/Questions.js"
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renamePath = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
  } catch (error) {
    console.log("Erro ao renomar arquivo:", error.message);
    throw error;
  }
};

const updateImage = async (newPath) => {
  try {
    const newImage = await fs.readFile(newPath);
    return newImage;
  } catch (error) {
    console.log("Erro ao atualizar arquivo:", error.message);
    throw error;
  }
};

export const editar_questao = async (req, reply) => {
  let nameImageDirUpdated;
  let newImage;
  try {
    const result = await Database.findByPk(req.body.id);
    const imageBuffer = result["dataValues"]["image"];
    const nameImageDir = result["dataValues"]["nameImageDir"];
    const oldPath = path.resolve(__dirname, "../images/" + nameImageDir);
    const newPath = path.resolve(__dirname, "../images/" + req.file.filename);

    if (req.file.filename && req.file) {
      try {
        await fs.access(newPath);
        newImage = await updateImage(newPath);
        nameImageDirUpdated = req.file.filename;
        console.log("Arquivo atualizado com sucesso!", newPath);
      } catch (error) {
        console.error("Erro ao acessar o diretório:", error);
      }
      try {
        await fs.access(oldPath);
        await renamePath(oldPath, newPath);
        console.log("Arquivo renomeado com sucesso!", oldPath);
      } catch (error) {
        console.log("Erro ao renomear arquivo:", error.message);
      }
    } else {
      newImage = imageBuffer;
      nameImageDirUpdated = nameImageDir;
    }
    await Database.update(
      {
        elementarySchool: req.body.elementarySchool,
        schoolYear: req.body.schoolYear,
        displice: req.body.displice,
        subject: req.body.subject,
        question: req.body.question,
        image: newImage,
        nameImageDir: nameImageDirUpdated,
        answer: req.body.answer,
        alternativeA: req.body.altA,
        alternativeB: req.body.altB,
        alternativeC: req.body.altC,
        alternativeD: req.body.altD,
      },
      { where: { id: req.body.id } }
    );
    reply.redirect("/");
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};

export const screen_editar_questao = (req, reply) => {
  try {
    // let image;
    // let nameImage;
    Database.findByPk(req.params.id).then((result) => {
      //console.group(result.nameImageDir);
      const nameImageDir = result["dataValues"]["nameImageDir"];
      //console.log('nameImageDir', nameImageDir);
      const imageBase64 = result["dataValues"]["image"].toString("base64");
      result["dataValues"]["image"] = imageBase64;

      reply.render("editar", {
        id: result.id,
        elementarySchool: result.elementarySchool,
        schoolYear: result.schoolYear,
        displice: result.displice,
        subject: result.subject,
        question: result.question,
        image: `data:image/jpeg;base64,${result.image}`,
        nameImageDir: result.nameImageDir,
        answer: result.answer,
        alternativeA: result.alternativeA,
        alternativeB: result.alternativeB,
        alternativeC: result.alternativeC,
        alternativeD: result.alternativeD,
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
