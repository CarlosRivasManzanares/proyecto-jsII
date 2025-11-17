import * as model from './model.js';
import RecipeView from '../js/views/RecipeView.js';
import searchViews from '../js/views/searchViews.js';
import ResultView from '../js/views/ResultView.js';
import PaginationView from '../js/views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');
const recipeView = new RecipeView();



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    console.log('ID recibido: ', id);
    if (!id)
      return;
    recipeView.renderSpinner(recipeContainer); // 23d. Mostrar el spinner mientras carga
    // Simular carga lenta (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    //url buena y movida a model.js
  } catch (err) {
    //alert('Error: ' + err); 
    recipeView.renderError(err.message);
    throw err;
  }
};
const controlSearchResults = async function () {
  try {
    const resultsContainer = document.querySelector('.results');
    ResultView.renderSpinner(resultsContainer);
    const query = searchViews.getQuery();
    if (!query) {
      console.log("no se ha ingresado información",)
      return;
    }
    await model.loadSearchResults(query);
  console.log("controlSearch: ", model.state.search.results);
  // Renderizar solo la página actual de resultados y la paginación
  ResultView.render(model.getSearchResultsPage());
  PaginationView.render(model.state.search);
  }
  catch (err) {
    console.log(err);
  }
}
const controlPagination = function (goToPage) {

  ResultView.render(model.getSearchResultsPage(goToPage));


  PaginationView.render(model.state.search);
};

PaginationView.addHandlerClick(controlPagination);

// Ejecutar la función de prueba (puedes comentar esta línea después de validar)
//controlRecipe();
//['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));
function init() {
  recipeView.addHandlerRender(controlRecipe);
  searchViews.addHandlerSearch(controlSearchResults);
}
init();