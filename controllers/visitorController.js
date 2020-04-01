const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");
const Course = mongoose.model("Course");

router.get("/allCourses", (req, res)=>{
    Course.find((err, doc)=>{
        if(!err){
            res.render("visitor/allCourses", {"layout": "totalLayout", "list": doc})
        }else{
            console.log("Error in fetching data")
        }
    })
})

router.get("/gallery", (req, res)=>{
    Course.find((err, doc)=>{
        if(!err){
            res.render("visitor/gallery", {"layout": "totalLayout", "list": doc})
        }else{
            console.log("Error in fetching data")
        }
    })
})

router.get("/blog", (req, res)=>{
    Course.find((err, doc)=>{
        if(!err){
            res.render("visitor/blog", {"layout": "totalLayout", "list": doc})
        }else{
            console.log("Error in fetching data")
        }
    })
})

module.exports = router;