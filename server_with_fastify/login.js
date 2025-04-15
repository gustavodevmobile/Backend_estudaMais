const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
console.log('login')
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      alert("Login bem-sucedido!");
      // Redirecionar para o painel do admin
      window.location.href = "/admin/dashboard";
    } else {
      alert("Usuário ou senha inválidos");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro no servidor");
  }
});