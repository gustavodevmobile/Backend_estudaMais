import fs from "fs";
import "dotenv/config";
import Database from "../database/database.js";

export const home = async (req, reply) => {
  try {
    let nameImage = [];
    await Database.findAll().then((result) => {
      result.map((element) => {
        const imageBase64 = element["dataValues"]["image"].toString("base64");
        element["dataValues"]["image"] = imageBase64;
        nameImage.push(element["dataValues"]["nameImageDir"]);
      });
      //console.log(result.length);
      return reply.render("templates/home", {
        question: result,
        length: result.length,
      });
    });
    //console.log("nameImage", nameImage);
    fs.readdir("./images/", { withFileTypes: true }, (err, files) => {
      files.map((el) => {
        if (nameImage.includes(el.name)) {
          //console.log('existe', el.name)
        } else {
          fs.unlinkSync("./images/" + el.name);
        }
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
