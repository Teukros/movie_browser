'use strict';
const personsDisplayer = {};
const templates = require('./templates');

personsDisplayer.load = (searchResults) => {
    const numberOfResults = searchResults.total_results;
    const persons = searchResults.results;
    const personsTemplate = templates.persons.resultTemplate;
    var $newTemplate = document.createElement('template');
    $newTemplate.innerHTML = personsTemplate;

    const $resultsHeader = document.querySelector("[data-ui='results-header']");
    $resultsHeader.innerHTML = `<div> There are ${numberOfResults} results for given search.</div>`;

    persons.forEach((person) => {
        const $clone = document.importNode($newTemplate.content, true);
        $clone.querySelector("h3").innerText = person.name;
        $resultsHeader.appendChild($clone);
    });
};

module.exports = personsDisplayer;