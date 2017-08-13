/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const templates = {
    movie: {},
    tv: {},
    persons: {}
};

templates.base = `
<style>
    select {
        cursor:pointer;
        display: block;
        text-align-last:center;
        font: 30px Arial, Sans-Serif;
        color:black;
        height:70px;
        color: white;
        background-color: black;
        width:170px;
        border:1px solid #ccc;
    }
</style>

<h1>Welcome!</h1>
<h2>You can start to search by entering any phrase and pushing 'submit' button. You can also change type of your query with dropdown menu.</h2>
<select data-ui="selectedOption">
    <option value="movies">Movies</option>
    <option value="tvSeries">TV Series</option>
    <option value="persons">People</option>
</select>
<div style="padding: 10px" data-ui="search-region"></div>
<div style="padding: 10px" data-ui="results-header"></div>
<div style="padding: 10px" data-ui="search-results"></div>
`

templates.movie.searchBox = `
<div>
    <form data-ui="search-form">Search for movie:
        <br>
        <input data-ui="query" type="text" name="query">
        <br>
        <input style="height:70px;width:100px" type="submit" name="search-btn">
    </form>
    <div data-ui="result"></div>
</div>`;

templates.movie.resultTemplate = `
    
        <h3>A Movie Title</h3>
        <p>A movie description.</p>
`;

templates.tv.searchBox = `
<div>
    <form data-ui="search-form">Search for TV series:
        <br>
        <input data-ui="query" type="text" name="query">
        <br>
        <input style="height:70px;width:100px" type="submit" name="search-btn">
    </form>
    <div data-ui="result"></div>
</div>`;

templates.tv.resultTemplate = `
    
        <h3>A TV Title</h3>
        <p>A tv description.</p>
`;


templates.persons.searchBox = `
<div>
    <form data-ui="search-form">Search for People:
        <br>
        <input data-ui="query" type="text" name="query">
        <br>
        <input style="height:70px;width:100px" type="submit" name="search-btn">
    </form>
    <div data-ui="result"></div>
</div>`;

templates.persons.resultTemplate = `
        <h3>Name</h3>
`;

module.exports = templates;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 - 2017 Franco Cavestri
 *
 * https://github.com/cavestri/themoviedb-javascript-library
 *
 */

var theMovieDb = {};

theMovieDb.common = {
    api_key: null,
    base_uri: "http://api.themoviedb.org/3/",
    images_uri: "http://image.tmdb.org/t/p/",
    timeout: 5000,
    generateQuery: function (options) {
        'use strict';
        var myOptions, query, option;

        myOptions = options || {};
        query = "?api_key=" + theMovieDb.common.api_key;

        if (Object.keys(myOptions).length > 0) {
            for (option in myOptions) {
                if (myOptions.hasOwnProperty(option) && option !== "id" && option !== "body") {
                    query = query + "&" + option + "=" + myOptions[option];
                }
            }
        }
        return query;
    },
    validateCallbacks: function (callbacks) {
        'use strict';
        if (typeof callbacks[0] !== "function" || typeof callbacks[1] !== "function") {
            throw "Success and error parameters must be functions!";
        }
    },
    validateRequired: function (args, argsReq, opt, optReq, allOpt) {
        'use strict';
        var i, allOptional;

        allOptional = allOpt || false;

        if (args.length !== argsReq) {
            throw "The method requires  " + argsReq + " arguments and you are sending " + args.length + "!";
        }

        if (allOptional) {
            return;
        }

        if (argsReq > 2) {
            for (i = 0; i < optReq.length; i = i + 1) {
                if (!opt.hasOwnProperty(optReq[i])) {
                    throw optReq[i] + " is a required parameter and is not present in the options!";
                }
            }
        }
    },
    getImage: function (options) {
        'use strict';
        return theMovieDb.common.images_uri + options.size + "/" + options.file;
    },
    client: function (options, success, error) {
        'use strict';
        var method, status, xhr;

        method = options.method || "GET";
        status = options.status || 200;
        xhr = new XMLHttpRequest();

        xhr.ontimeout = function () {
            error('{"status_code":408,"status_message":"Request timed out"}');
        };

        xhr.open(method, theMovieDb.common.base_uri + options.url, true);

        if(options.method === "POST") {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
        }

        xhr.timeout = theMovieDb.common.timeout;

        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === status) {
                    success(xhr.responseText);
                } else {
                    error(xhr.responseText);
                }
            } else {
                error(xhr.responseText);
            }
        };

        xhr.onerror = function (e) {
            error(xhr.responseText);
        };
        if (options.method === "POST") {
            xhr.send(JSON.stringify(options.body));
        } else {
            xhr.send(null);
        }
    }
};

theMovieDb.configurations = {
    getConfiguration: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "configuration" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.account = {
    getInformation: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "account" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLists: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getFavoritesMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/favorite_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addFavorite: function (options, success, error) {
        'use strict';
        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "movie_id", "favorite"]);

        theMovieDb.common.validateCallbacks([success, error]);

        body = {
            "movie_id": options.movie_id,
            "favorite": options.favorite
        }


        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/favorite" + theMovieDb.common.generateQuery(options),
                status: 201,
                method: "POST",
                body: body
            },
            success,
            error
        );
    },
    getRatedMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/rated_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getWatchlist: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/movie_watchlist" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addMovieToWatchlist: function (options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "movie_id", "movie_watchlist"]);

        theMovieDb.common.validateCallbacks([success, error]);

        body = {
            "movie_id": options.movie_id,
            "movie_watchlist": options.movie_watchlist
        }

        theMovieDb.common.client(
            {
                url: "account/" + options.id + "/movie_watchlist" + theMovieDb.common.generateQuery(options),
                method: "POST",
                status: 201,
                body: body
            },
            success,
            error
        );
    }
};

theMovieDb.authentication = {
    generateToken: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "authentication/token/new" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    askPermissions: function(options){
        'use strict';

        window.open("https://www.themoviedb.org/authenticate/" + options.token + "?redirect_to=" + options.redirect_to);

    },
    validateUser: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["request_token", "username", "password"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "authentication/token/validate_with_login" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    generateSession: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["request_token"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "authentication/session/new" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    generateGuestSession: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "authentication/guest_session/new" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.certifications = {
    getList: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "certification/movie/list" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.changes = {
    getMovieChanges: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPersonChanges: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.collections = {
    getCollection: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "collection/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCollectionImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "collection/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }

};

theMovieDb.companies = {
    getCompany: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "company/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCompanyMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "company/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }

};

theMovieDb.credits = {
    getCredit: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.discover = {
    getMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "discover/movie" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTvShows: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "discover/tv" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }

};

theMovieDb.find = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id", "external_source"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "find/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.genres = {
    getList: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "genre/movie/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTVList: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "genre/tv/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }

};

theMovieDb.jobs = {
    getList: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "job/list" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.keywords = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "keyword/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "keyword/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.lists = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "list/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getStatusById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id", "movie_id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "list/" + options.id + "/item_status" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    addList: function (options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "name", "description"]);

        theMovieDb.common.validateCallbacks([success, error]);

        body = {
            "name": options.name,
            "description": options.description
        };

        delete options.name;
        delete options.description;

        if(options.hasOwnProperty("language")) {
            body["language"] = options.language;

            delete options.language;
        }

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    addItem: function (options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/add_item" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    removeItem: function (options, success, error) {
        'use strict';

        var body;

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "list/" + options.id + "/remove_item" + theMovieDb.common.generateQuery(options),
                body: body
            },
            success,
            error
        );
    },
    removeList: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                method:  "DELETE",
                status: 204,
                url: "list/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    clearList: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "confirm"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 204,
                body: {},
                url: "list/" + options.id + "/clear" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.movies = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getAlternativeTitles: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getKeywords: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getReleases: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/releases" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTrailers: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/trailers" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTranslations: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getRecommendations: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getSimilarMovies: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/similar_movies" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getReviews: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/reviews" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLists: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/lists" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLatest: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/latest" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    },
    getUpcoming: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/upcoming" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getNowPlaying: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/now_playing" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/popular" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTopRated: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/top_rated" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getStatus: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "movie/" + options.id + "/account_states" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    rate: function (options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
                body: { "value": rate }
            },
            success,
            error
        );
    },
    rateGuest: function (options, rate, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 4, options, ["guest_session_id", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                method:  "POST",
                status: 201,
                url: "movie/" + options.id + "/rating" + theMovieDb.common.generateQuery(options),
                body: { "value": rate }
            },
            success,
            error
        );
    }
};

theMovieDb.networks = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "network/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.people = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMovieCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/movie_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTvCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/tv_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/combined_credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTaggedImages: function(options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/tagged_images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/popular" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLatest: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "person/latest" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.reviews = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "review/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.search = {
    getMovie: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/movie" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCollection: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/collection" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTv: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/tv" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPerson: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/person" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getList: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/list" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCompany: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/company" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getKeyword: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/keyword" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getMulti: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "search/multi" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.timezones = {
    getList: function (success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 2);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "timezones/list" + theMovieDb.common.generateQuery()
            },
            success,
            error
        );
    }
};

theMovieDb.tv = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getAlternativeTitles: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/alternative_titles" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getContentRatings: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/content_ratings" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getKeywords: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/keywords" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );

    },
    getRecommendations: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/recommendations" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getSimilar: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/similar" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTranslations: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/videos" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getAiringToday: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/airing_today" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getLatest: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/latest" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getOnTheAir: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/on_the_air" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/popular" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getTopRated: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/top_rated" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.tvSeasons = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/videos" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

theMovieDb.tvEpisodes = {
    getById: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        'use strict';

        theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.validateCallbacks([success, error]);

        theMovieDb.common.client(
            {
                url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/videos" + theMovieDb.common.generateQuery(options)
            },
            success,
            error
        );
    }
};

module.exports = theMovieDb;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const movieAPI = __webpack_require__(1);
const templates = __webpack_require__(0);
const helpers = __webpack_require__(3);
const moviesDisplayer = __webpack_require__(4);
const tvSeriesDisplayer = __webpack_require__(5);
const personsDisplayer = __webpack_require__(6);

movieAPI.common.api_key = '';

class movieDbSearchBox extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = templates.base;
        this.$selectedOptionField = document.querySelector("[data-ui='selectedOption']");
        this.$searchForm = document.querySelector("[data-ui='search-region']");
        this.$searchForm.innerHTML = helpers.getForm(this.$selectedOptionField.value);
        this.$resultsHeader = document.querySelector("[data-ui='results-header']");

        this.attachListener()
    }

    attachListener () {
        const movieDbSearchBox = this;
        movieDbSearchBox.$selectedOptionField.addEventListener('change', () => {
            let selectedSearchEntity = movieDbSearchBox.$selectedOptionField.value;
            movieDbSearchBox.$searchForm.innerHTML = helpers.getForm(selectedSearchEntity);
        });
        movieDbSearchBox.$searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let selectedSearchEntity = movieDbSearchBox.$selectedOptionField.value;
            let $searchQueryInput = document.querySelector("[data-ui='query'");
            let searchTerm = $searchQueryInput.value;

            helpers.executeRequest(selectedSearchEntity, searchTerm, (result) => {
                switch (result.type) {
                    case 'error':
                        movieDbSearchBox.displayErrors(result.message);
                        break;
                    case 'success':
                        let dataToDisplay = {
                            searchEntity: selectedSearchEntity,
                            searchResults: result.message
                        };
                        movieDbSearchBox.displaySearchResults(dataToDisplay);
                        break;
                }
            });
        })
    }

    displaySearchResults(dataToDisplay) {
        switch(dataToDisplay.searchEntity) {
            case 'movies':
                moviesDisplayer.load(dataToDisplay.searchResults);
                break;
            case 'tvSeries':
                tvSeriesDisplayer.load(dataToDisplay.searchResults);
                break;
            case 'persons':
                personsDisplayer.load(dataToDisplay.searchResults);
                break;
        }
    }

    displayErrors(errors) {
        this.$resultsHeader.innerHTML = '';
        if (!errors.isArray()){
            const p = document.createElement("p");
            p.innerText = `${errors}`;
            this.$resultsHeader.appendChild(p)
        }
        if (errors.isArray()){
            errors.forEach((error) => {
                const p = document.createElement("p");
                p.innerText = `${error}`;
                this.$resultsHeader.appendChild(p)
            })
        }
    }
}

window.customElements.define('moviedb-search-box', movieDbSearchBox);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const helpers = {};
const templates = __webpack_require__(0);
const movieAPI = __webpack_require__(1);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const moviesDisplayer = {};
const templates = __webpack_require__(0);

moviesDisplayer.load = (searchResults) => {
        const numberOfResults = searchResults.total_results;
        const movies = searchResults.results;
        const moviesTemplate = templates.movie.resultTemplate;
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const tvSeriesDisplayer = {};
const templates = __webpack_require__(0);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const personsDisplayer = {};
const templates = __webpack_require__(0);

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

/***/ })
/******/ ]);