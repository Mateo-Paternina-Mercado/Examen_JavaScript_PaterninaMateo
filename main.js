// Obtener elementos del DOM
const form = document.querySelector("form");
const nombreInput = document.getElementById("nombre");
const ingredientesInput = document.getElementById("ingredientes");
const instruccionesInput = document.getElementById("Instrunccion");
const tiempoInput = document.querySelector('input[type="time"]');
const porcionesInput = document.querySelector('input[type="number"]');
const categoriaInputs = document.querySelectorAll('input[type="checkbox"]');
const dificultadInputs = document.querySelectorAll('input[type="checkbox"]');

// Cargar recetas desde LocalStorage al cargar la página
window.addEventListener("load", () => {
    const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
    displayRecetas(recetasGuardadas);
});

// Función para guardar una receta
function guardarReceta() {
    // Validaciones
    if (nombreInput.value === "" || ingredientesInput.value === "" || instruccionesInput.value === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    // Obtener valores de los campos
    const nombre = nombreInput.value;
    const ingredientes = ingredientesInput.value;
    const instrucciones = instruccionesInput.value;
    const tiempo = tiempoInput.value;
    const porciones = porcionesInput.value;
    const categoria = obtenerCategoriaSeleccionada();
    const dificultad = obtenerDificultadSeleccionada();

    // Crear un objeto con los datos de la receta
    const nuevaReceta = {
        nombre,
        ingredientes,
        instrucciones,
        tiempo,
        porciones,
        categoria,
        dificultad
    };

    // Obtener recetas almacenadas desde LocalStorage
    const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];
    recetasGuardadas.push(nuevaReceta);

    // Guardar las recetas actualizadas en LocalStorage
    localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));

    // Limpiar el formulario
    form.reset();

    // Mostrar las recetas actualizadas
    displayRecetas(recetasGuardadas);
}

// Función para obtener las categorías seleccionadas
function obtenerCategoriaSeleccionada() {
    let categoriaSeleccionada = [];
    categoriaInputs.forEach((checkbox) => {
        if (checkbox.checked) {
            categoriaSeleccionada.push(checkbox.nextElementSibling.textContent);
        }
    });
    return categoriaSeleccionada.join(", ");
}

// Función para obtener el nivel de dificultad seleccionado
function obtenerDificultadSeleccionada() {
    let dificultadSeleccionada = [];
    dificultadInputs.forEach((checkbox) => {
        if (checkbox.checked) {
            dificultadSeleccionada.push(checkbox.nextElementSibling.textContent);
        }
    });
    return dificultadSeleccionada.join(", ");
}

// Función para mostrar las recetas
function displayRecetas(recetas) {
    const recetasList = document.getElementById("recetas-list");
    recetasList.innerHTML = ""; // Limpiar la lista antes de mostrar las nuevas recetas

    recetas.forEach((receta, index) => {
        const recetaElement = document.createElement("div");
        recetaElement.classList.add("receta");

        recetaElement.innerHTML = `
            <h3>${receta.nombre}</h3>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
            <p><strong>Instrucciones:</strong> ${receta.instrucciones}</p>
            <p><strong>Tiempo de preparación:</strong> ${receta.tiempo}</p>
            <p><strong>Número de porciones:</strong> ${receta.porciones}</p>
            <p><strong>Categoría:</strong> ${receta.categoria}</p>
            <p><strong>Dificultad:</strong> ${receta.dificultad}</p>
            <button class="delete-btn" onclick="eliminarReceta(${index})">Eliminar</button>
        `;

        recetasList.appendChild(recetaElement);
    });
}

// Función para eliminar una receta
function eliminarReceta(index) {
    // Obtener recetas almacenadas desde LocalStorage
    const recetasGuardadas = JSON.parse(localStorage.getItem("recetas")) || [];

    // Eliminar la receta por índice
    recetasGuardadas.splice(index, 1);

    // Guardar las recetas actualizadas en LocalStorage
    localStorage.setItem("recetas", JSON.stringify(recetasGuardadas));

    // Mostrar las recetas actualizadas
    displayRecetas(recetasGuardadas);
}

// Asignar el evento al botón de guardar
const guardarButton = document.getElementById("guardar");
guardarButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del botón de formulario
    guardarReceta();
});
