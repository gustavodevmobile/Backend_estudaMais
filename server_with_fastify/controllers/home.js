import fs from "fs";
import "dotenv/config";
import Database from "../models/Questions.js";

export const home = async (req, reply) => {
  try {
    await Database.findAll().then((result) => {
      result.map((element) => {
        const imageBase64 = element.dataValues.image.toString("base64");
        element.dataValues.image = imageBase64;
      });

      return reply.render("home", {
        question: result,
        length: result.length,
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
