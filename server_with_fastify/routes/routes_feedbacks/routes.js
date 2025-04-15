import { sendToEmail } from "../../controllers/feedbacks.js";

async function route_feedback(fastify, options) {
  fastify.post("/feedback", sendToEmail);
    
}

export default route_feedback;