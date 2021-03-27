const express = require("express");
const app = express();
const port = 8001;

// imports

app.use("/", require("./routes"));

// app listen on port

app.listen(port, (err) => {
  if (err) {
    console.log("error while listening on port = ", port);
    return;
  }
  console.log("connected on port  = ", port);
});
