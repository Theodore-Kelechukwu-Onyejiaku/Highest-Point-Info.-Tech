const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");
const Course = mongoose.model("Course");




/******************************************************************************************************/
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
    Student.findByIdAndRemove(req.params.id, (err, doc)=>{
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

/********************************************************************************************************************88 */
//End of Add and Edit Students






/********************************************************************************* */

/***
 * 
 *  TO VIEW ALL COURSES FROM THE HOME PAGE
 */
router.get("/allCourses", (req, res)=>{
    Course.find((err, doc)=>{
        if(!err){
            res.render("admin/allCourses", {"layout": "totalLayout", "list": doc})
        }else{
            console.log("Error in fetching data")
        }
    })
})

/**
 *  Add Or Edit Course Page
 */
router.get("/addOrEditCourse", (req, res)=>{
    res.render("admin/addOrEditCourse", {viewTitle: "Add Course"})
});

/**
 *  To get a single course and edit
 */
router.get("/addOrEditCourse/:_id", (req, res)=>{
    Course.findById(req.params._id, (err, doc)=>{
        if(!err){
            res.render("admin/addOrEditCourse", {viewTitle: "Edit Course", course: doc})
        }else{
            console.err("Error in retrieving data")
        }
    })
})

/**
 * To get a single course and delete
*/
router.get("/course/delete/:id", (req, res)=>{
            Course.findByIdAndRemove(req.params.id, (err, doc)=>{
                if(!err){
                    res.redirect("/admin/courseList")
                }else{
                    console.log("Error in deleting data")
                }
        })
})

/**
 *  To get list of all course 
 */
router.get("/courseList", (req, res)=>{
    Course.find((err, doc)=>{
        if(!err){
            res.render("admin/courseList", {list:doc, viewTitle: "Course List"})
        }else{
            console.log("Error in reading database")
        }
    })
});



//POST REQUESTS

/*
*   To Add Course
*/
router.post("/addOrEditCourse", (req, res)=>{
    const course = new Course();
    if(req.body._id == ""){
            course.name = req.body.name;
            course.duration = req.body.duration;
            course.cert = req.body.cert;
            course.price = req.body.price;
            course.ft1 = req.body.ft1;
            course.ft2 = req.body.ft2;
            course.ft3 = req.body.ft3;
            course.ft4 = req.body.ft4;
            course.ft5 = req.body.ft5;
            course.ft6 = req.body.ft6;
            course.ft7 = req.body.ft7;
            course.ft8 = req.body.ft8;
            course.ft9 = req.body.ft9;
            course.ft10 = req.body.ft10;


            course.save((err, doc)=>{
                if(!err){
                    res.redirect("/admin/courseList");
                }else{
                    console.error("Error inserting into database"+ err)
                }
            })     
    }else{
    Course.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
        if(!err){
            res.redirect("/admin/courseList");
        }else{
            console.error("Error in updating course information"+ err)
            res.render("admin/addOrEditCourse",{
                viewTitle: "Error in updating course data",
                course: req.body
                })
            }
        })
    }
})




/**********************************************************8 */


module.exports = router;