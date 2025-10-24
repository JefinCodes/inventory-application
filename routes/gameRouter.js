const { Router } = require("express");
const { getGames, addGame, displayForm, updateGame, deleteGame } = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.post("/", addGame);
gameRouter.get("/new", displayForm);
gameRouter.put("/:id", updateGame);
gameRouter.delete("/:id", deleteGame);

module.exports = gameRouter;