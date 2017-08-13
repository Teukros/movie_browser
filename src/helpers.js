'use strict';

const helpers = {};
const templates = require('./templates');
const movieAPI = require('./movieDBLibrary');

helpers.getForm = (selectedSearchEntity) => {
    switch (selectedSearchEntity) {
        case 'movies':
            return templates.movieSearchBox;
            break;
        case 'tvSeries':
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
            return movieAPI.search.getMovie(queryOptions, successCB, errorCB)
            break;
    }
}


module.exports = helpers;