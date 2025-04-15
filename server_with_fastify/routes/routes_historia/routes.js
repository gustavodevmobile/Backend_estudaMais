import {
  historia_1ano,
  historia_2ano,
  historia_3ano,
  historia_4ano,
  historia_5ano,
  historia_6ano,
  historia_7ano,
  historia_8ano,
  historia_9ano,
} from "../../controllers/historia.js";

const controllers = [
  historia_1ano,
  historia_2ano,
  historia_3ano,
  historia_4ano,
  historia_5ano,
  historia_6ano,
  historia_7ano,
  historia_8ano,
  historia_9ano,
];

async function routes_historia(fastify, options) {
  controllers.forEach((controller, index) => {
    const year = `${index + 1}ano`;
    fastify.get(`/historia/${year}`, controller);
  });
}

export default routes_historia;
