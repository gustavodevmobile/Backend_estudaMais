import { home } from '../../controllers/home.js';

async function route_home(fastify, options) {
  fastify.get('/', home);
}

export default route_home;