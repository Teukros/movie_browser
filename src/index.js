'use strict';
const movieAPI = require('./movieDBLibrary');
const templates = require('./templates');
const helpers = require('./helpers');
const moviesDisplayer = require('./moviesDisplayer');

movieAPI.common.api_key = 'ENTER API KEY HERE';

class movieDbSearchBox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        this.$selectedOptionField = document.querySelector("[data-ui='selectedOption']");
        this.$searchForm = document.querySelector("[data-ui='search-region']");
        this.$searchForm.innerHTML = helpers.getForm(this.$selectedOptionField.value);
        this.$searchQueryInput = document.querySelector("[data-ui='query'");
        this.$resultsHeader = document.querySelector("[data-ui='results-header']");

        this.attachListener()
    }

    attachListener () {
        const movieSearchBox = this;
        movieSearchBox.$selectedOptionField.addEventListener('change', () => {
            let selectedSearchEntity = movieSearchBox.$selectedOptionField.value;
            movieSearchBox.$searchForm.innerHTML = helpers.getForm(selectedSearchEntity);
        });
        movieSearchBox.$searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let selectedSearchEntity = movieSearchBox.$selectedOptionField.value;
            let searchTerm = movieSearchBox.$searchQueryInput.value;
            helpers.executeRequest(selectedSearchEntity, searchTerm, (result) => {
                switch (result.type) {
                    case 'error':
                        movieSearchBox.displayErrors(result.message);
                        break;
                    case 'success':
                        let dataToDisplay = {
                            searchEntity: selectedSearchEntity,
                            searchResults: result.message
                        };
                        movieSearchBox.displaySearchResults(dataToDisplay);
                        break;
                }
            });
        })
    }

    displaySearchResults(dataToDisplay) {
        switch(dataToDisplay.searchEntity) {
            case 'movies':
                moviesDisplayer.load(dataToDisplay.searchResults)
                break;
            case 'tvSeries':
                //
                break;
        }
    }

    displayErrors(errors) {
        this.$resultsHeader.innerHTML = ''
        errors.forEach((error) => {
            var p = document.createElement("p");
            p.innerText = `${error}`;
            this.$resultsHeader.appendChild(p)
        })
    }
}

window.customElements.define('moviedb-search-box', movieDbSearchBox);
