const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    time: [
      {
        type: String,
        require: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Appointment", AppointmentSchema);
