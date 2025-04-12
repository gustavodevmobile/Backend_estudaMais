import { geografia_1ano, geografia_2ano, geografia_3ano, geografia_4ano, geografia_5ano, geografia_6ano, geografia_7ano, geografia_8ano, geografia_9ano } from "../../controllers/geografia.js";

async function routes_geografia(fastify, options) {
  fastify.get("/geografia/1ano", geografia_1ano);
  fastify.get("/geografia/2ano", geografia_2ano);
  fastify.get("/geografia/3ano", geografia_3ano);
  fastify.get("/geografia/4ano", geografia_4ano);
  fastify.get("/geografia/5ano", geografia_5ano);
  fastify.get("/geografia/6ano", geografia_6ano);
  fastify.get("/geografia/7ano", geografia_7ano);
  fastify.get("/geografia/8ano", geografia_8ano);
  fastify.get("/geografia/9ano", geografia_9ano);
}

export default routes_geografia;