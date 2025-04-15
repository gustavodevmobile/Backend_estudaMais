
export const logout = async (req, reply) => {
  try {
    // Limpa o cookie que contém o token
    reply.clearCookie("token");
    //console.log("aqui");
    // Redireciona para a tela de login
    return reply.redirect("/login/admin");
  } catch (err) {
    console.error("Erro ao realizar logout:", err);
    return reply.code(500).send("Erro ao realizar logout");
  }
};
  