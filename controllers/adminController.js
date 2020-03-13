const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");


//  GET REQUESTS

router.get("/", (req, res)=>{
    res.render("admin/welcomeAdmin", {viewTitle: "Register Student"})
});

router.get("/addOrEditStudent", (req, res)=>{
    res.render("admin/addOrEditStudent", {viewTitle: "Register Student"})
});

router.get("/studentList", (req, res)=>{
    Student.find((err, doc)=>{
        if(!err){
            res.render("admin/studentList", {list:doc})
        }else{
            console.log("Error in reading database")
        }
    })
});


//POST REQUESTS

router.post("/addOrEditStudent", (req, res)=>{
    var student = new Student();
    student.name = req.body.name;
    student.email = req.body.email;
    student.number = req.body.number;
    student.address = req.body.address;
    student.dob = req.body.dob;
    student.username = req.body.username;
    student.password = req.body.password;

    student.save((err, doc)=>{
        if(!err){
            res.redirect("/admin/studentList");
        }else{
            console.error("Error inserting into database"+ err)
        }
    })


})



module.exports = router;