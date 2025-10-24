const express = require("express");
const app = express();
const path = require("node:path");
const gameRouter = require("./routes/gameRouter");
const developerRouter = require("./routes/developersRouter");
const { display404Page } = require("./controllers/routeNotFoundController");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/developers", developerRouter);
app.get("{*splat}", display404Page);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app - listening on port ${PORT}!`);
});