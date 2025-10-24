const { Router } = require("express");
const { getDeveloper } = require('../controllers/developerController');

const developerRouter = Router();

developerRouter.get("/:id", getDeveloper);

module.exports = developerRouter;