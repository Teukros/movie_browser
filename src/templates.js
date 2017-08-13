'use strict';
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