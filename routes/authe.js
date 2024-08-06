const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedpassword = await bycrypt.hash(password, 10);
    const user = new User({ username, password: hashedpassword });
    await user.save();
    res.status(500).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bycrypt.compare(password, user.password))) {
      return
      res.status(400).send("INVALID");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
