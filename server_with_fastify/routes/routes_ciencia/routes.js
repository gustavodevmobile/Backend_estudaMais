import {
  ciencias_1ano,
  ciencias_2ano,
  ciencias_3ano,
  ciencias_4ano,
  ciencias_5ano,
  ciencias_6ano,
  ciencias_7ano,
  ciencias_8ano,
  ciencias_9ano,
} from "../../controllers/ciencias.js";

const controllers = [
  ciencias_1ano,
  ciencias_2ano,
  ciencias_3ano,
  ciencias_4ano,
  ciencias_5ano,
  ciencias_6ano,
  ciencias_7ano,
  ciencias_8ano,
  ciencias_9ano,
];

async function routes_ciencias(fastify, options) {
  controllers.forEach((controller, index) => {
    const year = `${index + 1}ano`;
    fastify.get(`/ciencias/${year}`, controller);
  });
}

export default routes_ciencias;
