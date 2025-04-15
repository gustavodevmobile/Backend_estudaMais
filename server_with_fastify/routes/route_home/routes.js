import { home } from '../../controllers/home.js';
import { verifyToken } from "../../controllers/middleware.js";

async function route_home(fastify, options) {
  fastify.get("/", { preHandler: verifyToken }, home);
}

export default route_home;