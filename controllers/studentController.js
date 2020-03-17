const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");


router.get("/", (req, res)=>{
    res.end("welcoome to the student controller")
});

//Login Page
router.get("/login", (req, res)=>{
    res.redirect("/login.html")
});


router.post("/register", (req, res)=>{
    const student = new Student();
            student.name = req.body.name;
            student.email = req.body.email;
            student.number = req.body.number;
            student.address = req.body.address;
            student.dob = req.body.dob;
            student.username = req.body.username;
            student.password = req.body.password;

            student.save((err, doc)=>{
                if(!err){
                    res.redirect("/student/login");
                }else{
                    console.error("Error inserting into database"+ err)
                }
            })
})     



module.exports = router;