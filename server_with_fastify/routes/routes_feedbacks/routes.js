import { sendToEmailFeedbackfailures, sendToEmailFeedbackApp  } from "../../controllers/feedbacks.js";

async function route_feedback(fastify, options) {
  fastify.post("/feedback", sendToEmailFeedbackfailures);  
  fastify.post("/feedback-app", sendToEmailFeedbackApp); 
}

export default route_feedback;