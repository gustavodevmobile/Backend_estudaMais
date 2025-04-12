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
  controllers.forEach((controller,index)=>{
    const year = `${index+1}ano`;
    fastify.get(`/ciencias/${year}`, controller);
  })
  // fastify.get("/ciencias/1ano", ciencias_1ano);
  // fastify.get("/ciencias/2ano", ciencias_2ano);
  // fastify.get("/ciencias/3ano", ciencias_3ano);
  // fastify.get("/ciencias/4ano", ciencias_4ano);
  // fastify.get("/ciencias/5ano", ciencias_5ano);
  // fastify.get("/ciencias/6ano", ciencias_6ano);
  // fastify.get("/ciencias/7ano", ciencias_7ano);
  // fastify.get("/ciencias/8ano", ciencias_8ano);
  // fastify.get("/ciencias/9ano", ciencias_9ano);
}

export default routes_ciencias;
