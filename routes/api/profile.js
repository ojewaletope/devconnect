const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// load models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const router = express.Router();
// @route GET api/v1/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "profile works" });
});

// @route GET api/v1/profile
// @desc Current user's profile route
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.message = "No profile for this user";
          return res.status(404).json({status: false, errors});
        }
        res.status(200).json(profile);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

// @route POST api/v1/profile
// @desc Current user's profile route
// @access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  // get fields
  let profile_fields = {};
  profile_fields.user = req.user.id;
  if (req.body.handle) {
    profile_fields.handle = req.body.handle;
  }
  if (req.body.company) {
    profile_fields.company = req.body.company;
  }
  if (req.body.website) {
    profile_fields.website = req.body.website;
  }
  if (req.body.location) {
    profile_fields.location = req.body.location;
  }
  if (req.body.bio) {
    profile_fields.bio = req.body.bio;
  }
  if (req.body.status) {
    profile_fields.status = req.body.status;
  }
  if (req.body.github_username) {
    profile_fields.github_username = req.body.github_username;
  }
  // split the skills into comma separated array
  if (typeof (req.body.skills !== 'undefined')) {
    profile_fields.skills = req.body.skills.split(',')
  }
  // social media
  profile_fields.social = {};
  if (req.body.youtube)  {
    profile_fields.social.youtube = req.body.youtube
  }
  if (req.body.facebook)  {
    profile_fields.social.facebook = req.body.facebook
  }
  if (req.body.twitter)  {
    profile_fields.social.twitter = req.body.twitter
  }
  if (req.body.linkedin)  {
    profile_fields.social.linkedin = req.body.linkedin
  }
  Profile.findOne({user: req.user.id}).then(profile => {
    if (profile) {
      // update
      profile.findOneAndUpdate({user: req.user.id}, {$set: profile_fields}, {new: true}).then(res => {
        res.status(200).json(profile);
      })
    } else {
      // create profile
      // check if handle exists
      Profile.findOne({handle: req.user.handle}).then(profile => {
        if (profile) {
          errors.handle = "Handle exists";
          res.status(400).json(errors)
        }
        new Profile(profile_fields).save().then(profile => {
          res.status(200).json(profile);
        })
      })
    }
  })
})
module.exports = router;
