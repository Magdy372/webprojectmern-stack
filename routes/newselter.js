import express from "express";
import Newselter from "../models/newselter.js";

const router = express.Router();

// POST route to handle form submission
router.post("/newsletter", async (req, res) => {


  try {
    const { mail, name } = req.body;

    const subscriber = new Newselter({ mail, name });
    await subscriber.save();

    res.redirect('/');
  } catch (error) {
    res.send(error);
  }
});

export default router;