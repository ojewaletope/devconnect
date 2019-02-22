const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
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
      .populate("user", ["name", "avatar "])
      .then(profile => {
        if (!profile) {
          errors.message = "No profile for this user";
          return res.status(200).json({ status: false, errors });
        }
        res.status(200).json(profile);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

// @route GET api/v1/profile/handle:handle
// @desc Current user's profile by handle
// @access Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "No profile for the user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// @route GET api/v1/profile/user/:user_id
// @desc Current user's profile by id
// @access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "No profile for the user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// @route GET api/v1/profile/all
// @desc Current user's profile by id
// @access Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profile = "No profiles for the user";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(error => {
      res.status(404).json({ error: "There are no profiles for the user" });
    });
});

// @route POST api/v1/profile
// @desc Current user's profile route
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
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
    if (typeof (req.body.skills !== "undefined")) {
      profile_fields.skills = req.body.skills.split(",");
    }
    // social media
    profile_fields.social = {};
    if (req.body.youtube) {
      profile_fields.social.youtube = req.body.youtube;
    }
    if (req.body.facebook) {
      profile_fields.social.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      profile_fields.social.twitter = req.body.twitter;
    }
    if (req.body.linkedin) {
      profile_fields.social.linkedin = req.body.linkedin;
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profile_fields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create profile
        // check if handle exists
        Profile.findOne({ handle: req.user.handle }).then(profile => {
          if (profile) {
            errors.handle = "Handle exists";
            res.status(400).json(errors);
          }
          new Profile(profile_fields)
            .save()
            .then(profile => res.status(200).json(profile));
        });
      }
    });
  }
);
// @route POST api/v1/profile/experience
// @desc add experience to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to array of experience
      profile.experience.unshift(newExperience);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route POST api/v1/profile/education
// @desc add education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        field_of_study: req.body.field_of_study,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      // add to array of experience
      profile.education.unshift(newEducation);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/v1/profile/experience/:experience_id
// @desc delete education to profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      //splice out array
      profile.experience.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route DELETE api/v1/profile/experience/:experience_id
// @desc delete education to profile
// @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      //splice out array
      profile.education.splice(removeIndex, 1);
      //save
      profile.save().then(profile => res.json(profile));
    });
  }
);
// @route DELETE api/v1/profile/experience/:experience_id
// @desc delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res
          .status(200)
          .json({ success: true, message: "Account successfully" + " deleted" })
          .catch(error => res.json({ success: false, error: error }));
      });
    });
  }
);

module.exports = router;
