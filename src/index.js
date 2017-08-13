'use strict';
const movieAPI = require('./movieDBLibrary');
const templates = require('./templates');
const helpers = require('./helpers');
const moviesDisplayer = require('./moviesDisplayer');
const tvSeriesDisplayer = require('./tvSeriesDisplayer');
const personsDisplayer = require('./personsDisplayer');

movieAPI.common.api_key = '46a9a7237451bee93f64c978baa12ef4';

class movieDbSearchBox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        this.$selectedOptionField = document.querySelector("[data-ui='selectedOption']");
        this.$searchForm = document.querySelector("[data-ui='search-region']");
        this.$searchForm.innerHTML = helpers.getForm(this.$selectedOptionField.value);
        this.$resultsHeader = document.querySelector("[data-ui='results-header']");

        this.attachListener()
    }

    attachListener () {
        const movieDbSearchBox = this;
        movieDbSearchBox.$selectedOptionField.addEventListener('change', () => {
            let selectedSearchEntity = movieDbSearchBox.$selectedOptionField.value;
            movieDbSearchBox.$searchForm.innerHTML = helpers.getForm(selectedSearchEntity);
        });
        movieDbSearchBox.$searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let selectedSearchEntity = movieDbSearchBox.$selectedOptionField.value;
            let $searchQueryInput = document.querySelector("[data-ui='query'");
            let searchTerm = $searchQueryInput.value;

            helpers.executeRequest(selectedSearchEntity, searchTerm, (result) => {
                switch (result.type) {
                    case 'error':
                        movieDbSearchBox.displayErrors(result.message);
                        break;
                    case 'success':
                        let dataToDisplay = {
                            searchEntity: selectedSearchEntity,
                            searchResults: result.message
                        };
                        movieDbSearchBox.displaySearchResults(dataToDisplay);
                        break;
                }
            });
        })
    }

    displaySearchResults(dataToDisplay) {
        switch(dataToDisplay.searchEntity) {
            case 'movies':
                moviesDisplayer.load(dataToDisplay.searchResults);
                break;
            case 'tvSeries':
                tvSeriesDisplayer.load(dataToDisplay.searchResults);
                break;
            case 'persons':
                personsDisplayer.load(dataToDisplay.searchResults);
                break;
        }
    }

    displayErrors(errors) {
        this.$resultsHeader.innerHTML = '';
        errors.forEach((error) => {
            var p = document.createElement("p");
            p.innerText = `${error}`;
            this.$resultsHeader.appendChild(p)
        })
    }
}

window.customElements.define('moviedb-search-box', movieDbSearchBox);
