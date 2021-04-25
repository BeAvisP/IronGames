require("dotenv").config();

const express = require("express");

require("./configs/db.config");
require("./configs/debugger.config");

const app = express();

//Middleware Setup
require("./configs/middleware.config")(app);

//Express View engine setup
require("./configs/sass.config")(app);

require("./configs/views.config")(app);

//Default value for title local
require("./configs/locals.config")(app);
//Session configuration
require("./configs/session.config")(app);
//Passport
require("./configs/passport.config")(app);

const index = require("./routes/index");
const authRouter = require("./routes/auth.routes");
const privateRouter = require("./routes/private.routes");
const gamesRouter = require('./routes/games.routes');
const gameRouter = require('./routes/game.routes');
const reviewRouter = require('./routes/review.routes');
app.use("/", index);
app.use("/", authRouter);
app.use("/profile", privateRouter);
app.use('/games', gamesRouter);
app.use('/game', gameRouter);
app.use('/review', reviewRouter);

module.exports = app;
