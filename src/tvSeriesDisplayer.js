'use strict';
const tvSeriesDisplayer = {};
const templates = require('./templates');

tvSeriesDisplayer.load = (searchResults) => {
        const numberOfResults = searchResults.total_results;
        const tvs = searchResults.results;
        const tvsTemplate = templates.tv.resultTemplate;
        var $newTemplate = document.createElement('template');
        $newTemplate.innerHTML = tvsTemplate;

        const $resultsHeader = document.querySelector("[data-ui='results-header']");
        $resultsHeader.innerHTML = `<div> There are ${numberOfResults} results for given search.</div>`;

    tvs.forEach((tv) => {
            const $clone = document.importNode($newTemplate.content, true);
            $clone.querySelector("h3").innerText = tv.name;
            $clone.querySelector("p").innerText = tv.overview;
            $resultsHeader.appendChild($clone);
        });
    };

module.exports = tvSeriesDisplayer;