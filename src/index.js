'use strict';
const templates = require('./templates');

class movieSearchBox extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = templates.base;
    }
}

window.customElements.define('movie-search-box', movieSearchBox);
