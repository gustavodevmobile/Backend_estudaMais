import Sequelize from "sequelize";

const Question = sequelize.define('question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    elementarySchool: {
        type: Sequelize.TEXT
    },
    schoolYear: {
        type: Sequelize.TEXT
    },
    displice: {
        type: Sequelize.TEXT
    },
    subject: {
        type: Sequelize.TEXT
    },
    question: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.BLOB
    },
    nameImageDir:{
        type: Sequelize.TEXT
    },
    answer: {
        type: Sequelize.TEXT
    },
    alternativeA: {
        type: Sequelize.TEXT
    },
    alternativeB: {
        type: Sequelize.TEXT
    },
    alternativeC: {
        type: Sequelize.TEXT
    },
    alternativeD: {
        type: Sequelize.TEXT
    }
});