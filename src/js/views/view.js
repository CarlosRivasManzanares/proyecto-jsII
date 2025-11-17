import icons from 'url:../../img/icons.svg' // Parcel v2
class view {
        _data;
    render(data) {
        this._data = data; //Guarda los datos recibidos
        this._clear(); //Limpia el contenido previo
        const markup = this._generateMarkup(); //Genera el nuevo HTML
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
       renderSpinner(parentEl) {
        const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
        parentEl.innerHTML = ''; // 23c. Limpiar el contenido previo
        parentEl.insertAdjacentHTML('afterbegin', markup); // 23b. Insertar el spinner
    }
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev =>
            window.addEventListener(ev, handler)
        );
    }
    _errorMessage = "No encontramos la receta, encuentra con otra"
    renderError(message = this._errorMessage){
        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
          this._clear(); //Limpia el contenido previo
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
        renderMessage(message = this._errorMessage){
        const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
          this._clear(); //Limpia el contenido previo
          this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
        _clear() {
        this._parentElement.innerHTML = '';
    }
}

export default view;
export { view };