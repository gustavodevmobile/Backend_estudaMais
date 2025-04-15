import { screen_login, loginAdmin } from "../../controllers/adminController.js";

async function route_admin (fastify, opts) {
  fastify.get("/login/admin", screen_login);
  //fastify.post("/admin/register", registerAdmin);
  fastify.post("/admin/login", loginAdmin);
}

export default route_admin; 