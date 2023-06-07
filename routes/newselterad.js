import express from "express";
import newselterad from "../models/newselter.js";

const router = express.Router();

// POST route to handle form submission
router.get("/newselterad", async (req, res) => {
    newselterad.find()
    .then(result=>{
          console.log(result);
          res.render("newselterad", {mails:result, User: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });

});

export default router;