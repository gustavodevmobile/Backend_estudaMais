import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import "dotenv/config";

export const screen_login = async (req, reply) => {
  return await reply.render("templates/login");
};
// export const registerAdmin = async (req, reply) => {
//   const { username, password } = req.body;

//   try {
//     // Verifica se o usuário já existe
//     const existingAdmin = await Admin.findOne({ where: { username } });
//     if (existingAdmin) {
//       return reply.code(400).send("Usuário já existe");
//     }

//     // Criptografa a senha
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Cria o administrador
//     await Admin.create({ username, password: hashedPassword });
//     return reply.code(201).send("Administrador registrado com sucesso!");
//   } catch (err) {
//     console.error(err);
//     return reply.code(500).send("Erro ao registrar administrador");
//   }
// };

export const loginAdmin = async (req, reply) => {
  const { username, password } = req.body;
 
  try {
    // Verifica se o usuário existe
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return reply.render('templates/login', {messege: "Usuário não existe" });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return reply.render('templates/login', {messege: "Usuário ou senha incorreta." });
    }

    // Gera o token JWT
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Define o token no cookie HTTP-only
    reply.setCookie("token", token, {
      httpOnly: true, // Impede acesso ao cookie via JavaScript
      secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
      sameSite: "strict", // Protege contra CSRF
      maxAge: 3600, // Expira em 1 hora
      path: "/",
    });
    return reply.redirect('/');
  } catch (err) {
    console.error(err);
    return reply.render('templates/login', {messege: "Erro ao fazer login." });
  }
};
