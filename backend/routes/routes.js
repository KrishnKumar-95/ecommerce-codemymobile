const express = require("express");
const router = express.Router();
const User = require("../src/models/Users")

router.get("/home",(req,res)=>{
    res.status(200).render("homepage");
})

module.exports = router;