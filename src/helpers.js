'use strict';

const helpers = {};
const templates = require('./templates');

helpers.getForm = (selectedSearchEntity) => {
    switch (selectedSearchEntity) {
        case 'movie':
            return templates.movieSearchBox;
            break;
        case 'tvSeries':
            break;
    }
};

module.exports = helpers;