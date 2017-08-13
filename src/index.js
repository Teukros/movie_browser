'use strict';
const movieAPI = require('./movieDBLibrary');
const templates = require('./templates');
const helpers = require('./helpers');

movieAPI.common.api_key = 'ENTER API KEY HERE';

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
            let searchTerm = movieSearchBox.$searchQueryInput.value;
            console.log('future request with value: ' + searchTerm)
        })
    }
}

window.customElements.define('movie-search-box', movieSearchBox);
