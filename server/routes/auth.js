const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

//route for signup
router.post("/signup", (req, res) => {
  const { name, dob, email, password } = req.body;

  if (!name || !email || !password || !dob) {
    return res.status(422).json({ error: "Please add all the feilds!!" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with this email!!" });
      }

      bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          name,
          dob,
          email,
          password: hashPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "user saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//route for signin
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter the fields properly" });
  }
  User.findOne({ email: email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (!doMatch) {
            return res
              .status(422)
              .json({ error: "Invaild Email or password !!" });
          } else {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            res.json({ token, message: "login sucess" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
