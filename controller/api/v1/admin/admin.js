const Admin = require("../../../../model/admin");
const jwt = require("jsonwebtoken"); // importing jsonwebtoken
const Appointment = require("../../../../model/appointment");
module.exports.signUp = async (req, res) => {
  try {
    //find admin using the given username
    let user = await Admin.findOne({ name: req.body.name });

    if (!user) {
      //if username is not found then create new username
      await Admin.create(req.body);
      return res.json(200, {
        message: "success",
      });
    } else {
      // if user already present then return response
      return res.json(200, {
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
    //finding the admin in database
    let user = await Admin.findOne({ username: req.body.username });

    //check for the user password and user as well
    if (!user || user.password != req.body.password) {
      //if password incorrect or user not found in db return res
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    //if user found  then send tokens to user
    return res.json(200, {
      message: "success,here is your Token, Keep it Safe!!",
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

module.exports.showBooking = async (req, res) => {
  try {
    let appointment = await Appointment.find({}).populate("user");
    return res.status(200).json({
      message: "success",
      data: appointment,
    });
  } catch (error) {}
};
