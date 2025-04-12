import { deletar } from "../../controllers/deletar.js";

async function route_deletar(fastify, options) {
  fastify.get("/deletar/:id/:nameImageDir", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
          nameImageDir: { type: "string" },
        },
        required: ["id", "nameImageDir"],
      },
    },
    handler: deletar,
  });
}

export default route_deletar;
