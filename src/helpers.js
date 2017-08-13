'use strict';

const helpers = {};
const templates = require('./templates');
const movieAPI = require('./movieDBLibrary');

helpers.getForm = (selectedSearchEntity) => {
    if (!selectedSearchEntity) {
        throw new Error('you have to pass string parameter')
    }
    switch (selectedSearchEntity) {
        case 'movies':
            return templates.movie.searchBox;
            break;
        case 'tvSeries':
            return templates.tv.searchBox;
            break;
        case 'persons':
            return templates.persons.searchBox;
            break;
    }
};

helpers.executeRequest = (selectedOptionValue, searchTerm, cb) => {
    const queryOptions = {};
    const successCb = (response) => {
        let searchResult = JSON.parse(response);
        return cb({
            type: 'success',
            message: searchResult
        })
    };
    const errorCb = (response) => {
        let errorInfo = JSON.parse(response);
        return cb({
            type: 'error',
            message: errorInfo.errors
        });
    };
    switch (selectedOptionValue) {
        case 'movies':
            queryOptions.query = searchTerm;
            movieAPI.search.getMovie(queryOptions, successCb, errorCb);
            break;
        case 'tvSeries':
            queryOptions.query = searchTerm;
            movieAPI.search.getTv(queryOptions, successCb, errorCb);
            break;
        case 'persons':
            queryOptions.query = searchTerm;
            movieAPI.search.getPerson(queryOptions, successCb, errorCb);
            break;
    }
};

module.exports = helpers;