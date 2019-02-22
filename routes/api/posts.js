const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// load models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
// @route GET api/v1/posts/test
// @desc Tests post route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "post works" });
});

// @route GET api/v1/posts
// @desc Get post route
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ status: false, message: "No post found" })
    );
});

// @route GET api/v1/posts/:id
// @desc Get post route
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res
        .status(404)
        .json({ status: false, message: "No post" + " with the ID " })
    );
});

// @route POST api/v1/posts/test
// @desc Create post route
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      name: req.body.name,
      text: req.body.text,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.status(200).json({ status: false, post }));
    console.log(res);
  }
);

// @route DELETE api/v1/posts/:id
// @desc Delete post route
// @access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              status: false,
              message: "You are not" + " authorized to delete this post"
            });
          }
          post
            .remove()
            .then(() => res.json({ status: true, message: `Post deleted` }));
        })
        .catch(() =>
          res.status(404).json({ status: false, message: `Post not found` })
        );
    });
  }
);

//@route POST api/v1/posts/like:id
// @desc Like post route
// @access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check if the post has been liked by the user already
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ status: false, message: `You already like the post` });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(() =>
          res.status(404).json({ status: false, message: `Post not found` })
        );
    });
  }
);

//@route POST api/v1/posts/unlike:id
// @desc Like post route
// @access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check if the post has been liked by the user already
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ status: false, message: `You are yet to like the post` });
          }
          // get the remove index
          let removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // splice out of the array
          post.likes.splice(removeIndex, 1);
          post
            .save()
            .then(res => res.status(200).json({ message: `Post unliked` }));
        })
        .catch(() =>
          res.status(404).json({ status: false, message: `Post not found` })
        );
    });
  }
);
//@route POST api/v1/posts/comment/:id
// @desc Comments post route
// @access private
router.post(
  `/comment/:id`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        // add to comments array
        post.comments.unshift(newComment);
        // save to db
        post.save().then(post => res.status(200).json({ status: true, post }));
      })
      .catch(() =>
        res.status(400).json({ status: false, message: `Post not found` })
      );
  }
);

//@route DELETE api/v1/posts/comment/:id/:comment_id
// @desc Comments delete route
// @access private
router.delete(
  `/comment/:id/:comment_id`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ status: false, message: `comment does not exist` });
        }
        // get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        //splice from array
        post.comments.splice(removeIndex, 1);
      })
      .catch(() =>
        res.status(400).json({ status: false, message: `Post not found` })
      );
  }
);
module.exports = router;
