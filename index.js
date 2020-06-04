const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();
app.use(express.static("public"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routers
app.use("/", require("./routes/index"));
app.use("/send", require("./routes/send"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
