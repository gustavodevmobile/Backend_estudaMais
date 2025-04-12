import multer from "fastify-multer";
const upload = multer({ dest: "images/" });

import {
    cadastrar_questao,
    screen_cadastrar_questao,
  } from "../../controllers/cadastrar_questao.js";

  async function routes_cadastrar(fastify, options) {
    fastify.get("/registrar", screen_cadastrar_questao);
      fastify.post(
        "/cadastrar",
        { preHandler: upload.single("image") },
        cadastrar_questao
      );
  }

  export default routes_cadastrar;