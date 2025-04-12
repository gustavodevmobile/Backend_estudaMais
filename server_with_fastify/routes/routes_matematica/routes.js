import {
    matematica_1ano,
    matematica_2ano,
    matematica_3ano,
    matematica_4ano,
    matematica_5ano,
    matematica_6ano,
    matematica_7ano,
    matematica_8ano,
    matematica_9ano,
  } from "../../controllers/matematica.js";

  async function routesMatematica(fastify, options) {
    fastify.get("/matematica/1ano", matematica_1ano);
    fastify.get("/matematica/2ano", matematica_2ano);
    fastify.get("/matematica/3ano", matematica_3ano);
    fastify.get("/matematica/4ano", matematica_4ano);
    fastify.get("/matematica/5ano", matematica_5ano);
    fastify.get("/matematica/6ano", matematica_6ano);
    fastify.get("/matematica/7ano", matematica_7ano);
    fastify.get("/matematica/8ano", matematica_8ano);
    fastify.get("/matematica/9ano", matematica_9ano);
  }

  export default routesMatematica;
 
  