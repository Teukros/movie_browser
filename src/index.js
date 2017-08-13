'use strict';
const templates = require('./templates');
const movieAPI = require('./movieDBLibrary');
movieAPI.common.api_key = 'ENTER API KEY HERE';

class movieSearchBox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        this.$selectedOptionField = document.querySelector("[data-ui='selectedOption']");
        this.$searchForm = document.querySelector("[data-ui='search-region']");
        this.$searchForm.innerHTML = this.getForm(this.$selectedOptionField.value);
        this.$searchQueryInput = document.querySelector("[data-ui='query'");

        this.attachListener()
    }

    getForm (selectedOptionValue) {
        switch (selectedOptionValue) {
            case 'movie':
                return templates.movieSearchBox;
                break;
            case 'tvSeries':
                break;
        }
    }

    attachListener () {
        const movieSearchBox = this;
        this.$selectedOptionField.addEventListener('change', function(){
            movieSearchBox.$searchForm.innerHTML = movieSearchBox.getForm(movieSearchBox.$selectedOptionField.value);
        });
        movieSearchBox.$searchForm.addEventListener('click', function(event) {
            event.preventDefault();
            let searchTerm = movieSearchBox.$searchQueryInput.value;
            console.log('future request with value: ' + searchTerm)

        })
    }
}

window.customElements.define('movie-search-box', movieSearchBox);
