const express = require("express");
const router = express.Router();

 

//@ http method get
//@description its get information
//@PUBLIc access

router.get("/", (req,res) => {
    res.send("i am profile router");

});

module.exports = router;