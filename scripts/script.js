function login() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");


      const user = "Guest";
      const pass = "35932";

      if (username === user && password === pass) {
        message.style.color = "green";
        message.textContent = "Login bem-sucedido!";
        window.location.href = 'planilha.html';
        // Aqui você pode redirecionar com window.location.href = 'pagina.html';
      } else {
        message.style.color = "red";
        message.textContent = "Usuário ou senha incorretos.";
      }
    }