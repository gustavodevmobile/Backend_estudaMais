import Fastify from "fastify";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import fastifyMultipart from "@fastify/multipart";
import "dotenv/config";
import Database from "./models/Questions.js";
import Admin from "./models/Admin.js";
import fastifyFormbody from "@fastify/formbody";
import fastifyCookie from "@fastify/cookie";
import routes_matematica from "./routes/routes_matematica/routes.js";
import routes_portugues from "./routes/routes_portugues/routes.js";
import routes_geografia from "./routes/routes_geografia/routes.js";
import routes_historia from "./routes/routes_historia/routes.js";
import routes_ciencias from "./routes/routes_ciencia/routes.js";
import routes_cadastrar from "./routes/routes_cadastrar_questao/routes.js";
import route_deletar from "./routes/route_deletar/routes.js";
import routes_editar from "./routes/routes_editar/routes.js";
import route_home from "./routes/route_home/routes.js";
import route_feedback from "./routes/routes_feedbacks/routes.js";
import route_report_resum from "./routes/routes_report_resum/routes.js";
import route_admin from "./routes/adminRoutes/routes.js";
import logoutRoute from "./routes/logout/route.js";

const fastify = Fastify({
  logger: false,
});
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, // Chave para assinar cookies
  parseOptions: {}, // Opções adicionais para parsing de cookies
});

fastify.register(fastifyMultipart);

fastify.register(fastifyView, {
  engine: { handlebars: handlebars },
  viewExt: "handlebars",
  propertyName: "render",
});

// fastify.register(fastifyPostgres, {
//   connectionString: process.env.URL,
// });
fastify.register(fastifyFormbody);
fastify.register(routes_matematica);
fastify.register(routes_portugues);
fastify.register(routes_geografia);
fastify.register(routes_historia);
fastify.register(routes_ciencias);
fastify.register(routes_cadastrar);
fastify.register(route_deletar);
fastify.register(routes_editar);
fastify.register(route_home);
fastify.register(route_feedback);
fastify.register(route_report_resum);
fastify.register(route_admin);
fastify.register(logoutRoute);
// fastify.get("/questoes", async (req, reply) => {
//   try {
//     await Database.findAll().then((result) => {
//       return reply.send(result);
//     });
//   } catch (err) {
//     console.log(err);
//     return reply.send(err);
//   }
// });

fastify.get("/disciplinas", async (req, reply) => {
  var listDisciplines = [];
  var listResult = [];
  try {
    var result = await Database.findAll({ attributes: ["displice"] });
    for (var i in result) {
      listResult.push(result[i].dataValues.displice);
    }
    var listSet = new Set(listResult);
    var listDisciplines = Array.from(listSet);

    return reply.send(listDisciplines);
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
});

// fastify.get("/anos", async (req, reply) => {
//   var listAnos = [];
//   var listResult = [];
//   try {
//     var result = await Database.findAll({ attributes: ["schoolYear"] });
//     for (var i in result) {
//       listResult.push(result[i].dataValues.schoolYear);
//     }
//     var listSet = new Set(listResult);
//     var list = Array.from(listSet);
//     for (var i in list) {
//       listAnos.push({ ano: list[i] });
//     }
//     return reply.send(listAnos);
//   } catch (err) {
//     console.log(err);
//     return reply.send(err);
//   }
// });

fastify.get("/questoes/:disciplines", async (req, reply) => {
  const disciplinesListJson = req.params.disciplines;
  const disciplinesList = JSON.parse(disciplinesListJson);
  //console.log("disciplinesList", disciplinesList);
  var listResult = [];
  try {
    for (var i in disciplinesList) {
      await Database.findAll({
        where: {
          displice: disciplinesList[i],
        },
      }).then((result) => {
        for (var i in result) {
          listResult.push(result[i]["dataValues"]);
        }
        //console.log("listResult", listResult);
      });
    }
    return reply.send(listResult);
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
});

fastify.get("/questao/:idQuestion", async (req, reply) => {
  var listResult = [];
  var idsJson = req.params.idQuestion;
  var idsQuestion = JSON.parse(idsJson);
  console.log("$idQuestion", idsQuestion);
  try {
    for (var i in idsQuestion) {
      await Database.findByPk(idsQuestion[i]).then((result) => {
        listResult.push(result);
      });
    }
    return reply.send(listResult);
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
});

fastify.listen(
  {
    port: process.env.PORT ?? 8080,
    host: "0.0.0.0", // Use this if you want to expose the server publicly
  },
  (err) => {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
  }
);

// "dependencies": {
  //   "@fastify/cookie": "^11.0.2",
  //   "@fastify/formbody": "^8.0.1",
  //   "@fastify/multipart": "^9.0.1",
  //   "@fastify/view": "^10.0.1",
  //   "bcrypt": "^5.1.1",
  //   "dotenv": "^16.4.7",
  //   "fastify": "^5.1.0",
  //   "fastify-multer": "^2.0.3",
  //   "handlebars": "^4.7.8",
  //   "jsonwebtoken": "^9.0.2",
  //   "nodemailer": "^6.10.0",
  //   "pdfkit": "^0.16.0",
  //   "pg": "^8.14.1",
  //   "pg-hstore": "^2.3.4",
  //   "sequelize": "^6.37.5"
  // }
