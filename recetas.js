// recetas.js

const contenedor = document.getElementById('contenedor-recetas');
const busquedaInput = document.getElementById('busqueda');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroDificultad = document.getElementById('filtroDificultad');

function cargarRecetas() {
    const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
    return recetas;
}

function mostrarRecetas(filtradas) {
    contenedor.innerHTML = '';

    if (filtradas.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron recetas.</p>';
        return;
    }

    filtradas.forEach(receta => {
        const div = document.createElement('div');
        div.style.border = '1px solid gray';
        div.style.padding = '10px';
        div.style.margin = '10px';
        div.style.backgroundColor = '#ffffff20';

        div.innerHTML = `
            <h3>${receta.nombre}</h3>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
            <p><strong>Instrucciones:</strong> ${receta.instrucciones}</p>
            <p><strong>Tiempo:</strong> ${receta.tiempo}</p>
            <p><strong>Porciones:</strong> ${receta.porciones}</p>
            <p><strong>Categorías:</strong> ${receta.categorias.join(', ')}</p>
            <p><strong>Dificultad:</strong> ${receta.dificultad}</p>
            <button onclick="eliminarReceta(${receta.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarReceta(id) {
    let recetas = cargarRecetas();
    recetas = recetas.filter(r => r.id !== id);
    localStorage.setItem('recetas', JSON.stringify(recetas));
    aplicarFiltros();
}

// Filtro combinado + búsqueda
function aplicarFiltros() {
    let recetas = cargarRecetas();
    const texto = busquedaInput.value.toLowerCase();
    const categoria = filtroCategoria.value;
    const dificultad = filtroDificultad.value;

    let filtradas = recetas.filter(r => {
        const coincideNombre = r.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria ? r.categorias.includes(categoria) : true;
        const coincideDificultad = dificultad ? r.dificultad === dificultad : true;
        return coincideNombre && coincideCategoria && coincideDificultad;
    });

    mostrarRecetas(filtradas);
}

// Eventos
busquedaInput.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
filtroDificultad.addEventListener('change', aplicarFiltros);

// Inicial
aplicarFiltros();

// Exponer para el botón de eliminar
window.eliminarReceta = eliminarReceta;