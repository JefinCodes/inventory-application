const pool = require("../db/pool");
const db = require("../db/queries");

function getGames(req, res) {
    res.render();
};

async function addGame(req, res) {
    const { name, genres, developers } = req.body;
    
    const genresArray = Array.isArray(genres) ? genres : [genres];
    const developersArray = Array.isArray(developers) ? developers : [developers];

    await db.insertGame(name, genresArray, developersArray);
    res.redirect("/games");
};

function displayForm(req, res) {
    res.render("form");
};

function updateGame(req, res) {
    res.render();
};

function deleteGame(req, res) {
    res.render();
};

module.exports = { getGames, addGame, displayForm, updateGame, deleteGame };