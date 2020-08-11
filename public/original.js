//ROUTER LEVEL MIDDLEWARE
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//loading Auth Model
const User = require("../../Model/Auth");

//@ http method GET
//@description its AUTH get information
//@access PUBLIC

/*=======================LOGIN GET ROUTE =========================*/
router.get("/login", (req, res) => {
  res.render("./auth/login");
});

/*=======================REGISTER GET ROUTE =========================*/
router.get("/register", (req, res) => {
  res.render("./auth/register");
});

//@ http method POST
//@description its AUTH get information
//@access PUBLIC
/*=======================LOGIN POST ROUTE =========================*/
/*=======================REGISTER POST ROUTE =========================*/
router.post("/register", (req, res) => {
  //SERVER SIDE VALIDATION
  const errors = [];
  let { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Password should  Match" });
  }

  if (password.length < 6) {
    errors.push({ text: "Password should be minimum 6 Characters" });
  }
  if (errors.length > 0) {
    res.render("./auth/register", {
      errors,
      username,
      email,
      password,
      confirm_password,
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          req.flash(
            "errors_msg",
            "Email already Registered please choose another email address "
          );
          res.redirect("/auth/register", 401, {});
        } else {
          let newUser = new User({
            username,
            email,
            password,
          });
          //make password hashed
          bcrypt.genSalt(12, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(userData => {
                req.flash('success_msg', 'Successfully User Registered');
                res.redirect("/auth/login", 201, { userData });
              }).catch(err => console.log(err))
            });
          }); //done hashing and save in to database

        }
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;