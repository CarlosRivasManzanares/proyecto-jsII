//Estado global de la aplicación
//Aquí se guardan los datos que se comparten entre modulos
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
import { RES_PER_PAGE } from './config.js'; 
export const state = {
    recipe: {}, //receta actual cargada desde la API
    search: {
        query: '',
        results: [],
    }, //Resultados de búsqueda
    bookmarks: [], //Recetas guardadas por el usuario
};

export async function loadRecipe(id) {
    try {

        //           const resp = await fetch(
        //     (`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        //     //url con error para la prueba
        //   );

        const data = await getJSON(`${API_URL}${id}`);
        const recipe = data.data.recipe;
        console.log('receta', recipe);
        //estructura
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        console.log('Receta semicompleta', state.recipe);
    }
    catch (err) {
        console.log('${err} ❌❌❌');
        throw err;
    }
}
export const loadSearchResults = async function name(query) {
    try {
        const data = await getJSON(`${API_URL}/?search=${query}`);
        // 🧠 Transformamos y almacenamos los resultados en el estado global
        state.search.query = query;
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
        // Inicializar paginación
        state.search.page = 1;
        state.search.resultsPerPage = RES_PER_PAGE;
    }
    catch (err) {
        console.log(`${err} ❌❌❌`);
        //throw err;
    }
}
export const getSearchResultsPage = function (page = state.search.page) {
  // Asegurar valores por defecto
  if (!page) page = 1;
  state.search.page = page;
  const resultsPerPage = state.search.resultsPerPage || RES_PER_PAGE;

  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  return state.search.results.slice(start, end);
};

//loadSearchResults('pizza');