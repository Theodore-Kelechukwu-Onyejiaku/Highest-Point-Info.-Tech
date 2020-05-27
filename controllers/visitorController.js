const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {validateRegistration, validateLogin} = require("../middlewares/validation");
const bcrypt = require("bcryptjs");
const Course = mongoose.model("Course");

//Middlewares
const verify = require("../middlewares/verifyToken")

//Importing the body-parser middle ware
router.use(bodyparser.urlencoded({
    extended: true
}));
router.use(bodyparser.json())
//for cors
router.use(cors());
//Use of cookies
router.use(cookieParser());


//configuring dotenv file
require("dotenv").config();

//Importing User model
const Student = mongoose.model("Student");

//Login Page
router.get("/login", (req, res)=>{
    res.render("visitor/login", {"layout": ""})
});
router.get("/register", (req, res)=>{
    res.render("visitor/register",{"layout":""})
})

//Student Dashboard
router.get("/dashboard",verify,  (req, res) =>{
    res.render("visitor/dashboard")
})

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



/**
 *  POST REQUESTS
 */

router.post("/register", async(req, res)=>{
    //Validate Registration using Joi
    const {error} = validateRegistration(req.body);

    if(error){
        return  res.render("visitor/register", {"layout": "",error :error.details[0].message});
     }

    //Checking if the user is already in the database
   const emailExist = await Student.findOne({email: req.body.email});
   if(emailExist){
    return  res.render("visitor/register", {"layout": "", error :"Email already exists"});
   }

    //creating the salt and hashing the password entered
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hashSync(req.body.password,salt);
 

    const student = new Student();
            student.name = req.body.name;
            student.email = req.body.email;
            student.number = req.body.number;
            student.address = req.body.address;
            student.dob = req.body.dob;
            student.username = req.body.username;
            student.password = hashPassword;

            student.save((err, doc)=>{
                if(!err){
                    res.redirect("/login");
                }else{
                    console.error("Error inserting into database"+ err)
                }
            })
})     


//Login validation
router.post("/login",async (req, res)=>{
    //validating the user details before submittin to database
    const {error} = validateLogin(req.body);
    if(error){
      return  res.render("visitor/login", {"layout": "", error :error.details[0].message});
    }

    const student =await Student.findOne({email: req.body.email})

    if(!student) return  res.render("visitor/login", {"layout": "", error : "Email or password is wrong"});
    //If the user exists, here we compare password
    const validPass =  bcrypt.compareSync(req.body.password, student.password)
    console.log(validPass)

    //If the passwords do not match
    if(!validPass) return res.render("visitor/login", {"layout": "", error: "Email or password is wrong"});
      

    Student.findOne({email: req.body.email})
   .then(student =>{
       console.log(student);
       var token = jwt.sign(student.toJSON(),"secret",{ expiresIn: '20s' });
       res.cookie('auth',token);
       res.redirect("/dashboard");
   })
   .catch(err =>{
       console.error(err)
   })
})

module.exports = router;