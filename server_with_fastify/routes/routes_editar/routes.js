const upload = multer({ dest: "images/" });
import multer from "fastify-multer";

import {
  screen_editar_questao,
  editar_questao,
} from "../../controllers/editar.js";
import { verifyToken } from "../../controllers/middleware.js";

async function routes_editar(fastify, options) {
  fastify.get(
    "/editar-questao/:id",
    { preHandler: upload.single("image"), verifyToken },
    screen_editar_questao
  );

  
  fastify.post(
    "/editar",
    { preHandler: upload.single("imageUpdate") },
    editar_questao
  );
}

export default routes_editar;
