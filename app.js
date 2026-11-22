/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
 */
/**
 * Función para buscar pokemon ejercicio 1 y 2.
 */

// async function buscarPokemon(){
//     const input = document.getElementById('pokemon-input');
//     const resultSection = document.getElementById('result-section');
//     const pokemonData = document.getElementById('pokemon-data');

//     const nombre = input.value.trim().toLowerCase();

//     if (!nombre) {
//         pokemonData.innerHTML = '<p style="color: #ff6347;">Por favor, introduce un nombre de Pokémon.</p>';
//         resultSection.classList.remove('hidden');
//         return;
//     }

//     try {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

//         if (!response.ok) {
//             throw new Error('Pokémon no encontrado');
//         }

//         const data = await response.json();

//         const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
//         const id = data.id;
//         const sprite = data.sprites.front_default;

//         pokemonData.innerHTML = `
//             <div class="pokemon-card">
//                 <h3>${name} #${id}</h3>
//                 <img src="${sprite}" alt="${name}">
//             </div>
//         `;

//         resultSection.classList.remove('hidden');

//     } catch (error) {
//         pokemonData.innerHTML = `<p style="color: #ff6347;">${error.message}</p>`;
//         resultSection.classList.remove('hidden');
//     }
// }

document.getElementById('search-btn').addEventListener('click', buscarPokemon);


/**
 * Ejercicio 2: Buscar Pokémon con Promesas (then/catch)
 * Descomenta esta función y comenta la del Ejercicio 1 para probarla.
 */

// function buscarPokemon() {
//     const input = document.getElementById('pokemon-input');
//     const resultSection = document.getElementById('result-section');
//     const pokemonData = document.getElementById('pokemon-data');

//     const nombre = input.value.trim().toLowerCase();

//     if (!nombre) {
//         pokemonData.innerHTML = '<p style="color: #ff6347;">Por favor, introduce un nombre de Pokémon.</p>';
//         resultSection.classList.remove('hidden');
//         return;
//     }

//     fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Pokémon no encontrado');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
//             const id = data.id;
//             const sprite = data.sprites.front_default;

//             pokemonData.innerHTML = `
//                 <div class="pokemon-card">
//                     <h3>${name} #${id}</h3>
//                     <img src="${sprite}" alt="${name}">
//                 </div>
//             `;
//             resultSection.classList.remove('hidden');
//         })
//         .catch(error => {
//             pokemonData.innerHTML = `<p style="color: #ff6347;">${error.message}</p>`;
//             resultSection.classList.remove('hidden');
//         });
// }


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */

function buscarPokemonJQueryAJAX(){
    /**
     * Tu código aquí.
     */
}

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/
/**
$(document).ready(function(){
    $('#search-btn').on('click', buscarPokemonJQueryAJAX);
});
*/


/**
 * Ejercicio 4: Crear una lista de Pokémon capturados (async/await)
 * Colección en memoria para guardar Pokémon capturados
 */
const coleccionPokemon = [];

// Variables globales para guardar el Pokémon actual
let pokemonActualNombre = '';
let pokemonActualSprite = '';

async function buscarPokemon() {
    const input = document.getElementById('pokemon-input');
    const resultSection = document.getElementById('result-section');
    const pokemonData = document.getElementById('pokemon-data');

    const nombre = input.value.trim().toLowerCase();

    if (!nombre) {
        pokemonData.innerHTML = '<p style="color: #ff6347;">Por favor, introduce un nombre de Pokémon.</p>';
        resultSection.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();

        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const id = data.id;
        const sprite = data.sprites.front_default;

        // Guardar en variables globales para usar luego en agregarAColeccion
        pokemonActualNombre = name;
        pokemonActualSprite = sprite;

        pokemonData.innerHTML = `
            <div class="pokemon-card">
                <h3>${name} #${id}</h3>
                <img src="${sprite}" alt="${name}">
                <button id="add-to-collection-btn" class="btn-style">Agregar a la colección</button>
            </div>
        `;

        resultSection.classList.remove('hidden');

        // Event listener para el botón "Agregar a la colección"
        document.getElementById('add-to-collection-btn').addEventListener('click', agregarAColeccion);

    } catch (error) {
        pokemonData.innerHTML = `<p style="color: #ff6347;">${error.message}</p>`;
        resultSection.classList.remove('hidden');
    }
}

function agregarAColeccion() {
    const name = pokemonActualNombre;
    const sprite = pokemonActualSprite;

    // Verificar si ya está en la colección
    const yaExiste = coleccionPokemon.some(p => p.name === name);
    if (yaExiste) {
        alert(`${name} ya está en tu colección`);
        return;
    }

    coleccionPokemon.push({ name, sprite });
    alert(`${name} agregado a tu colección`);

    // Obtener el botón por ID para modificarlo
    const btn = document.getElementById('add-to-collection-btn');
    btn.disabled = true;
    btn.textContent = 'Agregado ✓';
    btn.style.backgroundColor = '#4CAF50';
}

// Event listener para Ver colección
document.getElementById('view-collection-btn').addEventListener('click', mostrarColeccion);

function mostrarColeccion() {
    const collectionSection = document.getElementById('collection-section');
    const collectionList = document.getElementById('collection-list');

    if (coleccionPokemon.length === 0) {
        collectionList.innerHTML = '<p style="color: #ffd700;">Tu colección está vacía. ¡Captura algunos Pokémon!</p>';
    } else {
        collectionList.innerHTML = coleccionPokemon.map(p => `
            <div class="collection-item">
                <img src="${p.sprite}" alt="${p.name}">
                <p>${p.name}</p>
            </div>
        `).join('');
    }

    collectionSection.classList.remove('hidden');
}