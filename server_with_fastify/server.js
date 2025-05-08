import Fastify from "fastify";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import fastifyMultipart from "@fastify/multipart";
import "dotenv/config";
import Database from "./models/Questions.js";
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
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import sequelize from "./database/database.js";
import { Op } from "sequelize";

const fastify = Fastify({
  logger: false,
});
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, // Chave para assinar cookies
  parseOptions: {}, // Opções adicionais para parsing de cookies
});

fastify.register(fastifyMultipart, {
  attachFieldsToBody: false,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de tamanho do arquivo (10 MB)
  },
});

fastify.register(fastifyView, {
  engine: { handlebars: handlebars },
  root: path.join(__dirname, "templates"),
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
//fastify.register(routes_);

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

// Rota que recebe disciplinas e retorna os anos escolares correspondentes
fastify.post("/disciplines/schoolyear", async (req, reply) => {
  const { disciplines } = req.body;
  try {
    const result = await Database.findAll({
      // Seleciona apenas o campo "schoolYear"
      attributes: ["id", "schoolYear"],
      where: {
        // Filtra pelas disciplinas fornecidas

        displice: disciplines,
      },
      // Garante que os anos escolares não sejam duplicados
      group: ["id", "schoolYear"],
    });
    const schoolYears = result.map((item) => ({
      id: item.id,
      schoolYear: item.schoolYear,
    }));
    //console.log(schoolYears);
    return reply.code(200).send(schoolYears);
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
});

// Rota que recebe disciplinas e anos escolares e retorna um objeto com assuntos relacionados, disciplinas e anos escolares
fastify.post("/disciplines/schoolyears/subjects", async (req, reply) => {
  const { disciplines, schoolYear } = req.body; // Recebe disciplinas e anos escolares do corpo da requisição
  //console.log("req.body", req.body);
  //console.log(disciplines, schoolYear);
  try {
    // Busca os assuntos relacionados às disciplinas e anos escolares
    const results = await Database.findAll({
      attributes: ["id", "displice", "schoolYear", "subject"], // Seleciona os campos necessários
      where: {
        displice: disciplines, // Filtra pelas disciplinas fornecidas
        schoolYear: schoolYear, // Filtra pelos anos escolares fornecidos
      },
    });
    // Remove duplicatas dos resultados
    const uniqueResults = results
      .map((item) => item.dataValues) // Extrai os valores dos resultados
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.displice === value.displice &&
              t.schoolYear === value.schoolYear &&
              t.subject === value.subject
          )
      );
    console.log("uniqueResults", uniqueResults);

    const response = uniqueResults.map((item) => {
      return {
        id: item.id,
        discipline: item.displice,
        schoolYear: item.schoolYear,
        subject: item.subject,
      };
    });
    //console.log("response", response);
    return reply.code(200).send(response); // Retorna o objeto estruturado
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Erro ao buscar dados: ", err });
  }
});

fastify.post("/resultadodabusca", async (req, reply) => {
  const filters = req.body; // Recebe o array de objetos no corpo da requisição
  console.log("req.body", filters);

  try {
    // Valida se o corpo da requisição é um array
    if (!Array.isArray(filters) || filters.length === 0) {
      return reply
        .code(400)
        .send({ error: "O corpo da requisição deve ser um array de objetos." });
    }

    // Busca as questões relacionadas com base nos filtros fornecidos
    const results = await Database.findAll({
      where: {
        [Op.or]: filters.map((filter) => ({
          displice: filter.disciplines,
          schoolYear: filter.schoolYear,
          subject: filter.subjects,
        })),
      },
    });

    // Retorna as questões encontradas
    return reply.code(200).send(results);
  } catch (err) {
    console.error(err);
    return reply
      .code(500)
      .send({ error: "Erro ao buscar questões relacionadas.", details: err });
  }
});

fastify.get("/questoes/:disciplines", async (req, reply) => {
  const disciplinesListJson = req.params.disciplines;
  const disciplinesList = JSON.parse(disciplinesListJson);
  console.log(disciplinesList);
  var listResult = [];
  try {
    //for (var i in disciplinesList) {
    const result = await Database.findAll({
      // Seleciona apenas o campo "schoolYear"
      attributes: ["schoolYear"],
      where: {
        // Filtra pelas disciplinas fornecidas
        displice: disciplinesList,
      },
      // Garante que os anos escolares não sejam duplicados
      group: ["schoolYear"],
    });
    // }

    const schoolYears = result.map((item) => item.schoolYear);
    console.log(schoolYears);
    return reply.send(listResult);
  } catch (err) {
    console.log(err);
    return reply.send(err);
  }
});

fastify.get("/questao/:idQuestion", async (req, reply) => {
  const listResult = [];
  const idsJson = req.params.idQuestion;
  const idsQuestion = JSON.parse(idsJson);
  console.log("idsQuestion", idsQuestion);

  const missingIds = [];

  try {
    for (var id of idsQuestion) {
      const result = await Database.findByPk(id);
      if (result) {
        listResult.push(result);
      } else {
        missingIds.push(id);
      }
    }
    console.log("listResult", listResult);
    console.log("missingIds", missingIds);

    return reply.send({
      questions: listResult,
      missingIds: missingIds,
    });
  } catch (err) {
    return reply.send(err);
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
})();

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

//https://backend-estudamais-4ebn.onrender.com
