import fs from "fs";
import "dotenv/config";
import Database from "../models/Questions.js";

const getDisciplines = (result) => {
  var listResult = [];
  for (var i in result) {
    listResult.push(result[i].dataValues.displice);
  }
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("disciplinas", list);
  return list;
};
const getSchoolYear = (result) => {
  var listResult = [];
  for (var i in result) {
    listResult.push(result[i].dataValues.schoolYear);
  }
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("ano escolar", list);
  return list;
};
const getSubjects = (result) => {
  var listResult = [];
  for (var i in result) {
    listResult.push(result[i].dataValues.subject);
  }
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("disciplinas", list);
  return list;
};
const getSubjectsByDisciplines = (result, discipline) => {
  var listResult = [];
  for (var i in result) {
    if (result[i].dataValues.displice == discipline) {
      listResult.push(result[i].dataValues.subject);
    }
  }
  //console.log(listResult);
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("assunto:", list);
  return list;
};

export const home = async (req, reply) => {
  try {
    await Database.findAll().then((result) => {
      result.map((element) => {
        const imageBase64 = element.dataValues.image.toString("base64");
        element.dataValues.image = imageBase64;
      });
      var disciplines = getDisciplines(result);
      var schoolYear = getSchoolYear(result);
      var subjects = getSubjects(result);
      var subjectOfGeografia = getSubjectsByDisciplines(
        result,
        'Geografia'
      );
      var subjectOfPortugues = getSubjectsByDisciplines(
        result,
        'Português'
      );
      var subjectOfMatematica = getSubjectsByDisciplines(
        result,
        'Matemática'
      );
      var subjectOfHistoria = getSubjectsByDisciplines(
        result,
        'História'
      );
      var subjectOfCiencias = getSubjectsByDisciplines(
        result,
        'Ciências'
      );

      return reply.render("home", {
        question: result,
        length: result.length,
        disciplines: disciplines,
        schoolYear: schoolYear,
        subjectsGeografia: subjectOfGeografia,
        subjectsPortugues: subjectOfPortugues,
        subjectsMatematica: subjectOfMatematica,
        subjectsHistoria: subjectOfHistoria,
        subjectsCiencias: subjectOfCiencias,


      });
    });
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
};
