'use strict';
const templates = require('./templates');
const movieAPI = require('./movieDBLibrary');
movieAPI.common.api_key = 'ENTER API KEY HERE';

class movieSearchBox extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        const selectedOption = document.querySelector("[data-ui='selectedOption']");
        const $searchForm = document.querySelector("[data-ui='search-region']");
        $searchForm.innerHTML = this.getForm(selectedOption.value);
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
}

window.customElements.define('movie-search-box', movieSearchBox);
