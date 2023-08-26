const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: (req, res) => {
    try {
      const { email, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ err });
        }

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hash,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({ mas: "user created" });
          })
          .catch((err) => {
            if (err.code === 11000) {
              return res.status(409).json({ message: "email already exist" });
            }
            res.status(500).json({ err });
          });
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({ message: error });
    }
  },
  login: (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      console.log(email);
      User.findOne({ email }).then((user) => {
        console.log(user);
        if (!user) {
          return res.status(401).json({ message: "Authentication failed 1" });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {return res.status(401).json({ message: "Authentication failed 2" });};
          if (!result) {return res.status(401).json({ message: "Authentication failed 3" });};
          const token = jwt.sign(
            { id: user._id, email: user.email,  },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ message: "Login successful", token });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json({ message: "error" });
    }
  },
};
