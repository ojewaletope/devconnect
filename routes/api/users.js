const express = require("express");

const router = express.Router();

// @route GET api/v1/users/test
// @desc Tests user route
// @access Public

router.get("/test", (req, res) => {
  res.json({ message: "User works" });
});

module.exports = router;
