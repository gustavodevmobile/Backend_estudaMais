import {
    matematica_1ano,
    matematica_2ano,
    matematica_3ano,
    matematica_4ano,
    matematica_5ano,
    matematica_6ano,
    matematica_7ano,
    matematica_8ano,
    matematica_9ano,
  } from "../../controllers/matematica.js";

  const controllers = [
    matematica_1ano,
    matematica_2ano,
    matematica_3ano,
    matematica_4ano,
    matematica_5ano,
    matematica_6ano,
    matematica_7ano,
    matematica_8ano,
    matematica_9ano,
  ];
  
  async function routes_matematica(fastify, options) {
    controllers.forEach((controller, index) => {
      const year = `${index + 1}ano`;
      fastify.get(`/matematica/${year}`, controller);
    });
  }

  

  export default routes_matematica;
 
  