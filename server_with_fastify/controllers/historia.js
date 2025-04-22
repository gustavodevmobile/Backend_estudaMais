import Database from "../models/Questions.js"

const renderHistoria = async (req, reply, discipline, schoolYear) => {
  var amountQuestions;
  try {
    await Database.findAll({
      where: { displice: discipline, schoolYear: schoolYear },
    }).then((result) => {
      result.map((element) => {
        const imageBase64 = element["dataValues"]["image"].toString("base64");
        element["dataValues"]["image"] = imageBase64;
        discipline = element["dataValues"]["displice"];
        schoolYear = element["dataValues"]["schoolYear"];
        amountQuestions = result.length;
      });

      return reply.render("disciplines", {
        question: result,
        amount: amountQuestions,
        discipline: discipline,
        schoolYear: schoolYear,
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};

export const historia_1ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "1º Ano");
export const historia_2ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "2º Ano");
export const historia_3ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "3º Ano");
export const historia_4ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "4º Ano");
export const historia_5ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "5º Ano");
export const historia_6ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "6º Ano");
export const historia_7ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "7º Ano");
export const historia_8ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "8º Ano");
export const historia_9ano = async (req, reply) =>
  renderHistoria(req, reply, "História", "9º Ano");
