const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

// getall users route
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ msg: "List of all employees.", users });
  } catch (error) {
    res.status(500).send({ Error: error });
  }
});

// user registeration route
userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ msg: "User already Registered. Try with another Email." });
    } else {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          return res.status(500).send({ Error: "Internal Server Error.", err });
        } else {
          const newUser = new UserModel({
            email,
            password: hash,
          });
          await newUser.save();
          return res.status(200).send({ msg: "User registered successfully." });
        }
      });
    }
  } catch (error) {
    return res.status(500).send({ Error: error.message });
  }
});

// user login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send({ error: "Internal Server Error." });
      }
      if (result) {
        const token = jwt.sign({ userId: user._id }, "nishant", {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .send({ msg: "User logged in successfully.", token });
      } else {
        return res.status(401).send({ error: "Incorrect password." });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal Server Error." });
  }
});

module.exports = { userRouter };
