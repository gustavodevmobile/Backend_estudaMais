import "dotenv/config";
import Database from "../models/Questions.js";
import { processData } from "../utils/helpers.js";

export const home = async (req, reply) => {
  try {
    await Database.findAll().then((result) => {
      result.forEach((element) => {
        element.dataValues.image = element.dataValues.image.toString("base64");
      });
      const datas = processData(result);
      return reply.render("home", {
        question: result,
        length: result.length,
        disciplines: datas.disciplines,
        schoolYear: datas.schoolYear,
        subjectsGeografia: datas.subjectOfGeografia.listSubjects,
        amountGeografia: datas.subjectOfGeografia.amountQuestions,
        subjectsPortugues: datas.subjectOfPortugues.listSubjects,
        amountPortugues: datas.subjectOfPortugues.amountQuestions,
        subjectsMatematica: datas.subjectOfMatematica.listSubjects,
        amountMatematica: datas.subjectOfMatematica.amountQuestions,
        subjectsHistoria: datas.subjectOfHistoria.listSubjects,
        amountHistoria: datas.subjectOfHistoria.amountQuestions,
        subjectsCiencias: datas.subjectOfCiencias.listSubjects,
        amountCiencias: datas.subjectOfCiencias.amountQuestions,
        amount1ano: datas.amount1ano,
        amount2ano: datas.amount2ano,
        amount3ano: datas.amount3ano,
        amount4ano: datas.amount4ano,
        amount5ano: datas.amount5ano,
        amount6ano: datas.amount6ano,
        amount7ano: datas.amount7ano,
        amount8ano: datas.amount8ano,
        amount9ano: datas.amount9ano,
        amountDisciplines1G: datas.amountDisciplines1G,
        amountDisciplines2G: datas.amountDisciplines2G,
        amountDisciplines3G: datas.amountDisciplines3G,
        amountDisciplines4G: datas.amountDisciplines4G,
        amountDisciplines5G: datas.amountDisciplines5G,
        amountDisciplines6G: datas.amountDisciplines6G,
        amountDisciplines7G: datas.amountDisciplines7G,
        amountDisciplines8G: datas.amountDisciplines8G,
        amountDisciplines9G: datas.amountDisciplines9G,
        amountDisciplines1M: datas.amountDisciplines1M,
        amountDisciplines2M: datas.amountDisciplines2M,
        amountDisciplines3M: datas.amountDisciplines3M,
        amountDisciplines4M: datas.amountDisciplines4M,
        amountDisciplines5M: datas.amountDisciplines5M,
        amountDisciplines6M: datas.amountDisciplines6M,
        amountDisciplines7M: datas.amountDisciplines7M,
        amountDisciplines8M: datas.amountDisciplines8M,
        amountDisciplines9M: datas.amountDisciplines9M,
        amountDisciplines1H: datas.amountDisciplines1H,
        amountDisciplines2H: datas.amountDisciplines2H,
        amountDisciplines3H: datas.amountDisciplines3H,
        amountDisciplines4H: datas.amountDisciplines4H,
        amountDisciplines5H: datas.amountDisciplines5H,
        amountDisciplines6H: datas.amountDisciplines6H,
        amountDisciplines7H: datas.amountDisciplines7H,
        amountDisciplines8H: datas.amountDisciplines8H,
        amountDisciplines9H: datas.amountDisciplines9H,
        amountDisciplines1C: datas.amountDisciplines1C,
        amountDisciplines2C: datas.amountDisciplines2C,
        amountDisciplines3C: datas.amountDisciplines3C,
        amountDisciplines4C: datas.amountDisciplines4C,
        amountDisciplines5C: datas.amountDisciplines5C,
        amountDisciplines6C: datas.amountDisciplines6C,
        amountDisciplines7C: datas.amountDisciplines7C,
        amountDisciplines8C: datas.amountDisciplines8C,
        amountDisciplines9C: datas.amountDisciplines9C,
        amountDisciplines1P: datas.amountDisciplines1P,
        amountDisciplines2P: datas.amountDisciplines2P,
        amountDisciplines3P: datas.amountDisciplines3P,
        amountDisciplines4P: datas.amountDisciplines4P,
        amountDisciplines5P: datas.amountDisciplines5P,
        amountDisciplines6P: datas.amountDisciplines6P,
        amountDisciplines7P: datas.amountDisciplines7P,
        amountDisciplines8P: datas.amountDisciplines8P,
        amountDisciplines9P: datas.amountDisciplines9P,
      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};

export const fetchById = async (req, reply) => {
  const { id } = req.query
  try {
    const result = await Database.findOne({
      where: { id },
    });
    
    console.log(result);
    if (!result) {
      return reply.render("home", {
        question: null,
        message: "Nenhuma questão encontrada com esse ID",
      });
    }else{
      const imageBuffer = result.dataValues.image;
      const imageSize = Buffer.byteLength(imageBuffer);
      const imageSizeKB = (imageSize / 1024).toFixed(2); // Convert to KB
      const imageSizeMB = (imageSizeKB / 1024).toFixed(2); // Convert to MB
      console.log("Image size in Megabytes:", imageSizeMB);

      console.log("Image size in KB:", imageSizeKB);
      result.dataValues.image = result.dataValues.image.toString("base64");
    }
    return reply.render("home", {
      question: [result],
      length: 1,
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
