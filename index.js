const express = require("express");
const app = express();
const port = 8001;
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-strategy");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded());
// imports modules
// routes
app.use("/", require("./routes"));

// app listen on port

app.listen(port, (err) => {
  if (err) {
    console.log("error while listening on port = ", port);
    return;
  }
  console.log("connected on port  = ", port);
});
