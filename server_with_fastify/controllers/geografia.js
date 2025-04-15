import Database from "../models/Questions.js"
let amountQuestions;
let discipline;
let schoolYear;

const renderGeografia = async (req, reply, discipline, schoolYear) => {
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

      return reply.render("templates/disciplines", {
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

export const geografia_1ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "1º Ano");
export const geografia_2ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "2º Ano");
export const geografia_3ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "3º Ano");
export const geografia_4ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "4º Ano");
export const geografia_5ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "5º Ano");
export const geografia_6ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "6º Ano");
export const geografia_7ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "7º Ano");
export const geografia_8ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "8º Ano");
export const geografia_9ano = async (req, reply) =>
  renderGeografia(req, reply, "Geografia", "9º Ano");
