const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../model/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "AppointmentBookingSecret",
  passReqToCallback: true,
};

passport.use(
  new JWTstrategy(opts, function (req, JwtPayLoad, done) {
    User.findById(JwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("error in finding user using jwt", err);
        return;
      }

      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
