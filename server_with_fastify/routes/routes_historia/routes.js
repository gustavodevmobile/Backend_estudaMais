import { historia_1ano, historia_2ano, historia_3ano, historia_4ano, historia_5ano, historia_6ano, historia_7ano, historia_8ano
, historia_9ano } from "../../controllers/historia.js";
 

async function routes_historia(fastify, options) {
  fastify.get("/historia/1ano", historia_1ano);
  fastify.get("/historia/2ano", historia_2ano);
  fastify.get("/historia/3ano", historia_3ano);
  fastify.get("/historia/4ano", historia_4ano);
  fastify.get("/historia/5ano", historia_5ano);
  fastify.get("/historia/6ano", historia_6ano);
  fastify.get("/historia/7ano", historia_7ano);
  fastify.get("/historia/8ano", historia_8ano);
  fastify.get("/historia/9ano", historia_9ano);
}
export default routes_historia;