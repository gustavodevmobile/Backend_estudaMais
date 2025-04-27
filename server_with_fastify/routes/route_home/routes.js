import { home, fetchById } from '../../controllers/home.js';
import { verifyToken } from "../../controllers/middleware.js";

export default async function route_home(fastify, options) {
  fastify.get("/", { preHandler: verifyToken }, home);
  fastify.get("/buscar", { preHandler: verifyToken }, fetchById);
}


//export default route_home;