import Sequelize from "sequelize";
import "dotenv/config";

//const connectDatabase = process.env.URL;

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nome do banco de dados
    process.env.DB_USER, // Usuário
    process.env.DB_PASS, // Senha
    {
      host: process.env.DB_HOST, // Host
      port: process.env.DB_PORT, // Porta
      dialect: "postgres", // Tipo de banco de dados
      dialectOptions: {
        ssl: {
          require: process.env.DB_SSL === "require", // SSL habilitado
          rejectUnauthorized: false, // Aceitar certificados não autorizados
        },
      },
      logging: false, // Desabilita logs de SQL no console
  }
);

// const Question = sequelize.define("question", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   elementarySchool: {
//     type: Sequelize.TEXT,
//   },
//   schoolYear: {
//     type: Sequelize.TEXT,
//   },
//   displice: {
//     type: Sequelize.TEXT,
//   },
//   subject: {
//     type: Sequelize.TEXT,
//   },
//   question: {
//     type: Sequelize.TEXT,
//   },
//   image: {
//     type: Sequelize.BLOB,
//   },
//   nameImageDir: {
//     type: Sequelize.TEXT,
//   },
//   answer: {
//     type: Sequelize.TEXT,
//   },
//   alternativeA: {
//     type: Sequelize.TEXT,
//   },
//   alternativeB: {
//     type: Sequelize.TEXT,
//   },
//   alternativeC: {
//     type: Sequelize.TEXT,
//   },
//   alternativeD: {
//     type: Sequelize.TEXT,
//   },
// });
// //Question.sync({force:true});

// const Admin = sequelize.define("admin", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// Sincronizar a tabela (opcional, apenas para desenvolvimento)
// Admin.sync({ force: true });

export default sequelize;

 //export default Question;
