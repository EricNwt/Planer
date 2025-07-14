let chart; // gráfico global

function parseValorBR(valorStr) {
  if (!valorStr) return 0;
  valorStr = valorStr.trim();
  valorStr = valorStr.replace(',', '.'); // troca decimal
  valorStr = valorStr.replace(/[^0-9.]/g, ''); // remove milhar
  return parseFloat(valorStr) || 0;
}

function calcularGastos() {
  const salario = parseValorBR(document.getElementById("salario").value);

  const categoriaCasa = ["internet", "iptu", "luz", "agua", "gas", "servicomensal", "mercado"];

  let somaCasa = 0;
  categoriaCasa.forEach(id => {
    const input = document.getElementById(id).value;
    somaCasa += parseValorBR(input);
  });

  const restante = salario - somaCasa;

  document.getElementById("resultado").innerHTML = `
    <p><strong>Casa:</strong> ${somaCasa.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
    <hr>
    <p><strong>Total de gastos com a casa:</strong> ${somaCasa.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
    <p><strong>Saldo restante do salário:</strong> ${restante.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
    <p><strong>Cálculo completo disponível na versão completa</strong></p>
  `;

  desenharGrafico(["Casa"], [somaCasa]);
}

function desenharGrafico(labels, dados) {
  const ctx = document.getElementById("graficoGastos").getContext("2d");

  if (chart) chart.destroy(); // remove gráfico anterior

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        label: "Gastos com Casa",
        data: dados,
        backgroundColor: ["#FF6384"], // Apenas uma cor necessária
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
          text: 'Gastos com Casa'
        }
      }
    }
  });
}