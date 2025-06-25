let chart; // Para atualizar sem criar gráfico duplicado

  function calcularGastos() {
    const salario = parseFloat(document.getElementById("salario").value) || 0;

    const categorias = {
      "Casa": ["internet", "iptu", "luz", "agua", "gas", "servicomensal", "mercado"],
      "Saúde": ["veterinario", "remedio", "medico"],
      "Transporte": ["transportepublico", "transporteparticular"],
      "Automóvel": ["combustivel", "ipva", "mecanico", "multa"],
      "Despesas Pessoais": ["higiene", "cabeleireiro", "vestuario", "academia", "ajuda"],
      "Lazer": ["restaurante", "deposito", "presente", "passeio", "jogos", "passagem", "hotel"],
      "Dependentes/Outros": ["escola", "outros"]
    };

    let totalGeral = 0;
    let maiorGastoValor = 0;
    let maiorGastoNome = "";
    let detalhes = "";
    const labels = [];
    const valores = [];

    for (let categoria in categorias) {
      let soma = 0;
      categorias[categoria].forEach(id => {
      let input = document.getElementById(id).value;
      let valorFormatado = input.replace(/\./g, "").replace(",", ".");
      soma += parseFloat(valorFormatado) || 0;
    });

      totalGeral += soma;
      labels.push(categoria);
      valores.push(soma);

      detalhes += `<p><strong>${categoria}:</strong> R$ ${soma.toFixed(2)}</p>`;

      if (soma > maiorGastoValor) {
        maiorGastoValor = soma;
        maiorGastoNome = categoria;
      }
    }

    const restante = salario - totalGeral;

    document.getElementById("resultado").innerHTML = `
      ${detalhes}
      <hr>
      <p><strong>Total de gastos:</strong> R$ ${totalGeral.toFixed(2)}</p>
      <p><strong>Maior gasto:</strong> ${maiorGastoNome} (R$ ${maiorGastoValor.toFixed(2)})</p>
      <p><strong>Saldo restante do salário:</strong> R$ ${restante.toFixed(2)}</p>
    `;

    desenharGrafico(labels, valores);
  }

  function desenharGrafico(labels, dados) {
    const ctx = document.getElementById("graficoGastos").getContext("2d");

    if (chart) chart.destroy(); // evita gráfico duplicado

    chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          label: "Gastos por Categoria",
          data: dados,
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56",
            "#4BC0C0", "#9966FF", "#FF9F40", "#6B8E23"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Distribuição dos Gastos'
          }
        }
      }
    });
  }