const User = require("../../../../model/user");
const jwt = require("jsonwebtoken"); // importing jsonwebtoken
const Appointment = require("../../../../model/appointment");
module.exports.signUp = async (req, res) => {
  console.log("In SignUp starts", req.body);
  try {
    //find doctor using the given username
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      //if username is not found then create new username
      await User.create(req.body);
      console.log("SignUp ends");
      return res.status(200).json({
        message: "success",
      });
    } else {
      // if user already present then return response
      return res.status(200).json({
        message: "user already registerd",
      });
    }
  } catch (error) {
    //handling error
    console.log("Erro in register", error);
  }
};

//login action for user
module.exports.login = async (req, res) => {
  try {
    //finding the doctor in database
    let user = await User.findOne({ username: req.body.username });

    //check for the user password and user as well
    if (!user || user.password != req.body.password) {
      //if password incorrect or user not found in db return res
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    //if user found  then send tokens to user
    return res.json(200, {
      message: "success",
      token: jwt.sign(user.toJSON(), "AppointmentBookingSecret", {
        expiresIn: 1000000,
      }),
    });
  } catch (err) {
    //handle error
    console.log("Error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};

module.exports.check_availablity = async (req, res) => {
  try {
    let appointment = await Appointment.findOne({
      $and: [{ date: req.body.date }, { time: req.body.time }],
    });
    if (appointment) {
      return res.status(501).json({
        message: "not available",
      });
    } else {
      return res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {}
};

module.exports.book = async (req, res) => {
  try {
    let appointment = await Appointment.findOne({
      $and: [{ date: req.body.date }, { time: req.body.time }],
    });
    if (!appointment) {
      // create new appointment
      await Appointment.create({
        date: req.body.date,
        time: req.body.time,
        user: req.user._id,
      });
      console.log("triggered");
      return res.status(200).json({
        message: "success",
      });
    } else {
      // there have appointment check for time
      return res.status(501).json({
        message: "not available",
      });
    }
  } catch (error) {}
};
module.exports.mybooking = async (req, res) => {
  try {
    let appt = await Appointment.find({ user: req.user._id });

    return res.status(200).json({
      message: "success",
      data: appt,
    });
  } catch (error) {}
};
