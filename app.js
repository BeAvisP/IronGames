require("dotenv").config();

const express = require("express");

require("./configs/db.config");
require("./configs/debugger.config");

const app = express();

// Middleware Setup
require("./configs/middleware.config")(app);

// Express View engine setup
require("./configs/sass.config")(app);

require("./configs/views.config")(app);

// default value for title local
require("./configs/locals.config")(app);
//Session configuration
require("./configs/session.config")(app);
//Passport
require("./configs/passport.config")(app);

const index = require("./routes/index");
const authRouter = require('./routes/auth.routes');
app.use("/", index);
app.use("/", authRouter);

module.exports = app;
