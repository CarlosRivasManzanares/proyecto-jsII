import { view } from "./view";
import icons from 'url:../../img/icons.svg'

class ResultView extends view {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query';
    _message = '';

    // Método privado para generar el markup completo
    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    // Método privado para cada resultado individual
    _generateMarkupPreview(result) {
        return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    }
}
export default new ResultView();