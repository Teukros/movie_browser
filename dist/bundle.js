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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const templates = __webpack_require__(1);

class movieSearchBox extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = templates.base;
    }
}

window.customElements.define('movie-search-box', movieSearchBox);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const templates = {};

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
    <option value="Movie">Movies</option>
    <option value="tvSeries">TV Series</option>
</select>
<input style="height:70px;width:100px" type="submit" name="searchBtn">

<div style="padding: 10px" data-ui="search-region"></div>`

module.exports = templates;

/***/ })
/******/ ]);