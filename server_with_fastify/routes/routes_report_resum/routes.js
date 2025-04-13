import { sendToEmail } from "../../controllers/send_report_resum.js";


async function route_report_resum(fastify, options) {
  fastify.post("/report", sendToEmail);
    
}

export default route_report_resum;