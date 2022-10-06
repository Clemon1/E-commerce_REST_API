const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const maxAge = "1d";
// Register Endpoint
router.post("/SignUp", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const existingMail = await User.findOne({ email });
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingMail) {
      return res.json("This email is already taken");
    }
    if (existingPhoneNumber) {
      return res.json("Phone number already affiliated with another account");
    }
    const salt = 12;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
    });
    const saveUser = await user.save();
    const token = await jwt.sign({ user: saveUser._id }, "ClemonJWTSecretKey", {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json(saveUser, token);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      return res.json("User not registered");
    } else {
      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (!checkPassword) {
        return res.json("Incorrect or Invalid Password");
      } else {
        const token = await jwt.sign(
          { user: findUser._id },
          "ClemonJWTSecretKey",
          {
            expiresIn: maxAge,
          },
        );
        res.cookie("jwt", token, {
          withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({ findUser, token, message: "Login Succesfully" });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
