import {
  geografia_1ano,
  geografia_2ano,
  geografia_3ano,
  geografia_4ano,
  geografia_5ano,
  geografia_6ano,
  geografia_7ano,
  geografia_8ano,
  geografia_9ano,
} from "../../controllers/geografia.js";

const controllers = [
  geografia_1ano,
  geografia_2ano,
  geografia_3ano,
  geografia_4ano,
  geografia_5ano,
  geografia_6ano,
  geografia_7ano,
  geografia_8ano,
  geografia_9ano,
];

async function routes_geografia(fastify, options) {
  controllers.forEach((controller, index) => {
    const year = `${index + 1}ano`;
    fastify.get(`/geografia/${year}`, controller);
  });
}

export default routes_geografia;
