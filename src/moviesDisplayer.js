'use strict';
const moviesDisplayer = {};
const templates = require('./templates');

moviesDisplayer.load = (searchResults) => {
        const numberOfResults = searchResults.total_results;
        const movies = searchResults.results;
        const moviesTemplate = templates.movieTemplate;
        var $newTemplate = document.createElement('template');
        $newTemplate.innerHTML = moviesTemplate;

        const $resultsHeader = document.querySelector("[data-ui='results-header']");
        $resultsHeader.innerHTML = `<div> There are ${numberOfResults} results for given search.</div>`
        movies.forEach((movie) => {
            const $clone = document.importNode($newTemplate.content, true);
            $clone.querySelector("h3").innerText = movie.title;
            $clone.querySelector("p").innerText = movie.overview;
            $resultsHeader.appendChild($clone);
        });
    };

module.exports = moviesDisplayer;