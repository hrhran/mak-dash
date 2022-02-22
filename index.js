const express = require("express");
const cors = require("cors");
const path = require("path");
const expressLayoutes = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const config = require("./startup/config");
const err = require("./middleware/errors");
const customerRoutes = require("./routes/customer-routes");
const levelRoutes = require("./routes/level-routes");
const app = express();
const session = require("cookie-session");

require("./startup/db")();

app.use(
  session({
    secret: "xdxdxd",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(expressLayoutes);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(customerRoutes.routes);
app.use(levelRoutes.routes);
app.use(err);

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
