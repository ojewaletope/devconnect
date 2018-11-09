const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validation/register");
// load user model
const User = require("../../models/User");
// @route GET api/v1/users/test
// @desc Tests user route
// @access Public

router.get("/test", (req, res) => {
  res.json({ message: "User works" });
});

// @route GET api/v1/users/register
// @desc Register user route
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route GET api/v1/users/login
// @desc login user route/ return jwt token
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //  check for user
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User does not exist"
      });
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user match
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        };
        // res.json({ status: true, message: "Success" });

        // sign token
        jwt.sign(payload, keys.key, { expiresIn: 900 }, (err, token) => {
          res.json({
            status: true,
            token: `Bearer ${token}`
          });
        });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Incorrect password" });
      }
    });
  });
});
// @route GET api/v1/users/current
// @desc return current user route
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      status: true,
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    });
  }
);
module.exports = router;
