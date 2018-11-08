const express = require("express");

const router = express.Router();
// @route GET api/v1/profile/test
// @desc Tests profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ message: "profile works" });
});

module.exports = router;
