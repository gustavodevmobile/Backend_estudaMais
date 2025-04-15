import { logout } from "../../controllers/logout.js";

async function logoutRoute (fastify, opts) {
  fastify.post("/admin/logout", logout);
}

export default logoutRoute;