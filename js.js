function calcularresistencia(event) {
  // Evita el envío del formulario si viene del botón
  if (event) event.preventDefault();

  const colores = {
    black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, gray: 8, white: 9
  };

  const multiplicadores = {
    black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
    green: 100000, blue: 1000000, violet: 10000000, gray: 100000000, white: 1000000000
  };

  const tolerancias = { gold: "±5%", silver: "±10%" };

  const b1 = document.getElementById("banda1").value;
  const b2 = document.getElementById("banda2").value;
  const b3 = document.getElementById("banda3").value;
  const b4 = document.getElementById("banda4").value;

  // Calcular el valor de la resistencia
  const valor = (colores[b1] * 10 + colores[b2]) * multiplicadores[b3];
  const tolerancia = tolerancias[b4];

  let resultadoTexto = "";
  if (valor >= 1000000) resultadoTexto = (valor / 1000000) + " MΩ " + tolerancia;
  else if (valor >= 1000) resultadoTexto = (valor / 1000) + " kΩ " + tolerancia;
  else resultadoTexto = valor + " Ω " + tolerancia;

  // Actualizar colores de las bandas en el resistor
  document.querySelector(".b1").style.backgroundColor = b1;
  document.querySelector(".b2").style.backgroundColor = b2;
  document.querySelector(".b3").style.backgroundColor = b3;
  document.querySelector(".b4").style.backgroundColor = b4;

  // Actualizar cuadros de color y texto
  const cuadros = [
    { id: "c1", texto: colores[b1], color: b1 },
    { id: "c2", texto: colores[b2], color: b2 },
    { id: "c3", texto: "×" + multiplicadores[b3] + " Ω", color: b3 },
    { id: "c4", texto: tolerancia, color: b4 },
  ];

  cuadros.forEach(c => {
    const div = document.querySelector(`#${c.id} div`);
    const p = document.querySelector(`#${c.id} p`);
    div.style.backgroundColor = c.color;
    p.textContent = c.texto;
  });

  // Mostrar resultado
  document.getElementById("resultado").textContent =
    "Valor de la resistencia: " + resultadoTexto;
}

// ======== 🔄 NUEVO: actualiza en tiempo real ========
["banda1", "banda2", "banda3", "banda4"].forEach(id => {
  document.getElementById(id).addEventListener("change", calcularresistencia);
});

// Al cargar la página, inicializa todo
window.addEventListener("DOMContentLoaded", calcularresistencia);
