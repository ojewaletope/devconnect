const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   //res.set('Content-Type', 'application/json');
//   next();
// });

// DB config
const db = require("./config/keys").mongoURI;

// connect mongoose
mongoose
  .connect(db,
   { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.log(err);
  });

// passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);
// use routes
app.use("/api/v1/users", users);
app.use("/api/v1/profile", profile);
app.use("/api/v1/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
