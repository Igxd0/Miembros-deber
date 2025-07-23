const form = document.getElementById("formRegistro");
const nombreInput = document.getElementById("nombre");
const deberInput = document.getElementById("deber");
const tbody = document.querySelector("#tablaRegistro tbody");
const btnLimpiar = document.getElementById("limpiar");

let lista = JSON.parse(localStorage.getItem("miembros")) || [];

function guardarStorage() {
  localStorage.setItem("miembros", JSON.stringify(lista));
}

function render() {
  tbody.innerHTML = "";
  lista.forEach((item, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.deber}</td>
      <td><button class="delete" data-index="${i}">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const deber = deberInput.value.trim();
  if (!nombre || !deber) return;
  lista.push({ nombre, deber });
  guardarStorage();
  render();
  nombreInput.value = "";
  deberInput.value = "";
  nombreInput.focus();
});

tbody.addEventListener("click", e => {
  if (e.target.matches(".delete")) {
    const i = e.target.dataset.index;
    lista.splice(i, 1);
    guardarStorage();
    render();
  }
});

btnLimpiar.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres borrar todo?")) {
    lista = [];
    guardarStorage();
    render();
  }
});

render();
