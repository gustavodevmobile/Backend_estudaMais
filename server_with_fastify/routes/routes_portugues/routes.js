import {
  portugues_1ano,
  portugues_2ano,
  portugues_3ano,
  portugues_4ano,
  portugues_5ano,
  portugues_6ano,
  portugues_7ano,
  portugues_8ano,
  portugues_9ano,
 } from "../../controllers/portugues.js";

const controllers = [
  portugues_1ano,
  portugues_2ano,
  portugues_3ano,
  portugues_4ano,
  portugues_5ano,
  portugues_6ano,
  portugues_7ano,
  portugues_8ano,
  portugues_9ano,
  ];
  
  async function routes_portugues(fastify, options) {
    controllers.forEach((controller, index) => {
      const year = `${index + 1}ano`;
      fastify.get(`/portugues/${year}`, controller);
    });
  }
export default routes_portugues;
