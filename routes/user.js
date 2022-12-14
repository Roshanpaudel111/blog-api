const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userID && req.body.userID === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are allowed to edit only your account!!");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userID && req.body.userID === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Successfully deleted the User");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You are allowed to delete only your account!!");
  }
});
module.exports = router;
