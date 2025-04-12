import {
  portugues_1ano,
  portugues_2ano,
  portugues_3ano,
  portugues_4ano,
  portugues_5ano,
  portugues_6ano,
  portugues_7ano,
  portugues_8ano,
  portugues_9ano,
 } from "../../controllers/portugues.js";

async function routes_portugues(fastify, options) {
  fastify.get("/portugues/1ano", portugues_1ano);
  fastify.get("/portugues/2ano", portugues_2ano);
  fastify.get("/portugues/3ano", portugues_3ano);
  fastify.get("/portugues/4ano", portugues_4ano);
  fastify.get("/portugues/5ano", portugues_5ano);
  fastify.get("/portugues/6ano", portugues_6ano);
  fastify.get("/portugues/7ano", portugues_7ano);
  fastify.get("/portugues/8ano", portugues_8ano);
  fastify.get("/portugues/9ano", portugues_9ano);
}

export default routes_portugues;
