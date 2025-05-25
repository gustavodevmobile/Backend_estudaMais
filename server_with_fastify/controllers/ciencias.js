
import Database from "../models/Questions.js"


const renderCiencias = async (req, reply, discipline, schoolYear) => {
  try {
    await Database.findAll({
      where: { discipline: discipline, schoolYear: schoolYear },
    }).then((result) => {
      result.map((element) => {
        const imageBase64 = element["dataValues"]["image"].toString("base64");
        element["dataValues"]["image"] = imageBase64;
        discipline = element["dataValues"]["displice"];
        schoolYear = element["dataValues"]["schoolYear"];
        //amountQuestions = result.length;
      });

      return reply.render("disciplines", {
        question: result,
        amount: result.length,
        discipline: discipline,
        schoolYear: schoolYear,
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};

export const ciencias_1ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "1º Ano");
export const ciencias_2ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "2º Ano");
export const ciencias_3ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "3º Ano");
export const ciencias_4ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "4º Ano");
export const ciencias_5ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "5º Ano");
export const ciencias_6ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "6º Ano");
export const ciencias_7ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "7º Ano");
export const ciencias_8ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "8º Ano");
export const ciencias_9ano = async (req, reply) =>
  renderCiencias(req, reply, "Ciências", "9º Ano");

