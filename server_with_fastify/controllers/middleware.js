import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = async (req, reply) => {
  try {
    // Obtém o token do cookie
    const token = req.cookies.token;
    //console.log(req.cookies.token);
    if (!token) {
      console.log("não contem token");
      return reply.redirect("/login/admin");
    }

    // Verifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário à requisição
    console.log("Verificação ok");
  } catch (err) {
    console.error("Erro ao verificar token:", err.message);
    return reply.code(401).send("Token inválido ou expirado");
  }
};
