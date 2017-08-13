'use strict';
const movieAPI = require('./movieDBLibrary');
const templates = require('./templates');
const helpers = require('./helpers');

movieAPI.common.api_key = '46a9a7237451bee93f64c978baa12ef4';

class movieSearchBox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        this.$selectedOptionField = document.querySelector("[data-ui='selectedOption']");
        this.$searchForm = document.querySelector("[data-ui='search-region']");
        this.$searchForm.innerHTML = helpers.getForm(this.$selectedOptionField.value);
        this.$searchQueryInput = document.querySelector("[data-ui='query'");

        this.attachListener()
    }

    attachListener () {
        const movieSearchBox = this;
        movieSearchBox.$selectedOptionField.addEventListener('change', function(){
            let selectedSearchEntity = movieSearchBox.$selectedOptionField.value;
            movieSearchBox.$searchForm.innerHTML = helpers.getForm(selectedSearchEntity);
        });
        movieSearchBox.$searchForm.addEventListener('click', function(event) {
            event.preventDefault();
            let selectedSearchEntity = movieSearchBox.$selectedOptionField.value;
            let searchTerm = movieSearchBox.$searchQueryInput.value;
            helpers.executeRequest(selectedSearchEntity, searchTerm, function(result){
                switch (result.type) {
                    case 'error':
                        console.log('this error will be displayed to user:');
                        console.log(result.message);
                        // movieSearchBox.displayErrors(result.message);
                        break;
                    case 'success':
                        console.log('this result will be displayed to user:');
                        console.log(result.message);
                        // movieSearchBox.displaySearchResults(result.message);
                        break;
                }
            });
        })
    }
}

window.customElements.define('movie-search-box', movieSearchBox);
