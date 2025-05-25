import Database from "../models/Questions.js"
let amountQuestions;
let discipline;
let schoolYear;

export const renderPortugues = async (req, reply, discipline, schoolYear) => {
  try {
    await Database.findAll({
      where: { discipline: discipline, schoolYear: schoolYear },
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

export const portugues_1ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "1º Ano");
export const portugues_2ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "2º Ano");
export const portugues_3ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "3º Ano");
export const portugues_4ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "4º Ano");
export const portugues_5ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "5º Ano");
export const portugues_6ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "6º Ano");
export const portugues_7ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "7º Ano");
export const portugues_8ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "8º Ano");
export const portugues_9ano = async (req, reply) =>
  renderPortugues(req, reply, "Português", "9º Ano");
