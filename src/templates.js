'use strict';
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