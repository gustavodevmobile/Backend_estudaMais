import Database from "../models/Questions.js"

const renderMatematica = async (req, reply, discipline, schoolYear) => {
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

export const matematica_1ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "1º Ano");
export const matematica_2ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "2º Ano");
export const matematica_3ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "3º Ano");
export const matematica_4ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "4º Ano");
export const matematica_5ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "5º Ano");
export const matematica_6ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "6º Ano");
export const matematica_7ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "7º Ano");
export const matematica_8ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "8º Ano");
export const matematica_9ano = async (req, reply) =>
  renderMatematica(req, reply, "Matemática", "9º Ano");
5;
