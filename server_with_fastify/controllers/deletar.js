import fs from "fs";
import "dotenv/config";
import Database from "../models/Questions.js"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deletar = (req, reply) => {
  const {id, nameImageDir} = req.params;
  const pathFile = path.resolve(__dirname, "../images/" + nameImageDir);
  
  try {
    if (fs.existsSync(pathFile) && fs.statSync(pathFile).isFile()) {
      fs.unlinkSync(pathFile);
      console.log("Imagem deletada com sucesso!");
      Database.destroy({ where: { id: req.params.id } });
      console.log("Deletado do DB com sucesso!");
      reply.redirect("/");
    } else {
      Database.destroy({ where: { id: req.params.id } });
      console.log("Questão sem imagem deletada do DB com sucesso!");
      reply.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
