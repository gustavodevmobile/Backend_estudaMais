import{ Sequelize } from "sequelize";
import sequelize from "../database/database.js";

const Question = sequelize.define("questions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    elementarySchool: {
      type: Sequelize.TEXT,
    },
    schoolYear: {
      type: Sequelize.TEXT,
    },
    displice: {
      type: Sequelize.TEXT,
    },
    subject: {
      type: Sequelize.TEXT,
    },
    question: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.BLOB,
    },
    answer: {
      type: Sequelize.TEXT,
    },
    alternativeA: {
      type: Sequelize.TEXT,
    },
    alternativeB: {
      type: Sequelize.TEXT,
    },
    alternativeC: {
      type: Sequelize.TEXT,
    },
    alternativeD: {
      type: Sequelize.TEXT,
    },
  });
  //Question.sync({force:true});

  export default Question;
  
  