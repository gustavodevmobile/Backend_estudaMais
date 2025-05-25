import Sequelize from "sequelize";
import "dotenv/config";

// const sequelize = new Sequelize(
//   process.env.DB_NAME, // Nome do banco de dados
//   process.env.DB_USER, // Usuário
//   process.env.DB_PASS, // Senha
//   {
//     host: process.env.DB_HOST, // Host
//     port: process.env.DB_PORT, // Porta
//     dialect: "postgres", // Tipo de banco de dados
//     dialectOptions: {
//       ssl: {
//         require: process.env.DB_SSL === "require", // SSL habilitado
//         rejectUnauthorized: false, // Aceitar certificados não autorizados
//       },
//     },
//     logging: false, // Desabilita logs de SQL no console
//   }
// );

const sequelize = new Sequelize("licao_em_casa", "postgres", "admin86", {
  host: "localhost",
  dialect: "postgres",
  port: 5433, // Porta padrão do PostgreSQL
  logging: false, // Desativa logs de SQL no console
});

export default sequelize;
