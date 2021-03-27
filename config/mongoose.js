// connect with mongodb database with mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/appointmentBooking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in database"));
db.once("open", () => {
  console.log("Connected to the database");
});

module.exports = db;
