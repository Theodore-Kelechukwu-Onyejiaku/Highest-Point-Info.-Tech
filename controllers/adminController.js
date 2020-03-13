const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");


//  GET REQUESTS

/**
 *  Admin First Page
 */
router.get("/", (req, res)=>{
    res.render("admin/welcomeAdmin", {viewTitle: "Register Student"})
});

/**
 *  Add Or Edit Student Page
 */
router.get("/addOrEditStudent", (req, res)=>{
    res.render("admin/addOrEditStudent", {viewTitle: "Register Student"})
});

/**
 *  To get a single student and edit
 */
router.get("/addOrEditStudent/:_id", (req, res)=>{
    Student.findById(req.params._id, (err, doc)=>{
        if(!err){
            res.render("admin/addOrEditStudent", {viewTitle: "Edit Student", student: doc})
        }else{
            console.err("Error in retrieving data")
        }
    })
})

/**
 *  To get a single student and delete
 */
router.get("/student/delete/:id", (req, res)=>{
    Student.findOneAndDelete(req.params._id, (err, doc)=>{
        if(!err){
            res.redirect("/admin/studentList")
        }else{
            console.error("error in fetching student data")
        }
    })
})

/**
 *  To get list of all students 
 */
router.get("/studentList", (req, res)=>{
    Student.find((err, doc)=>{
        if(!err){
            res.render("admin/studentList", {list:doc, viewTitle: "Student List"})
        }else{
            console.log("Error in reading database")
        }
    })
});



//POST REQUESTS

/*
*   To Register Student
*/
router.post("/addOrEditStudent", (req, res)=>{
    const student = new Student();
    if(req.body._id == ""){
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
    }else{
    Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err){
            res.redirect("/admin/studentList");
        }else{
            console.error("Error in updating student information"+ err)
            res.render("admin/addOrEditStudent",{
                viewTitle: "Error in updating student data",
                student: req.body
                })
            }
        })
    }
})




module.exports = router;