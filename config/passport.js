// passport authentication
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//Load user Schema
let User = require("../Model/Auth");

module.exports = (passport) => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //find user database
      User.findOne({ email })
        .then((user) => {
          //check email exists or not
          if (!user) {
            return done(null, false, {
              message: "Email is not registered",
            });
          }
          // password verification
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Invalid Password please give Valid password",
              });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  //session handling
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
