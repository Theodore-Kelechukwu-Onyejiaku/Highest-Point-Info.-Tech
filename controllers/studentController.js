const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.end("welcoome to the student controller")
});



module.exports = router;