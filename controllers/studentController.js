const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = mongoose.model("Student");
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {validateRegistration, validateLogin} = require("../middlewares/validation");
const bcrypt = require("bcryptjs");


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

router.get("/", (req, res)=>{
    res.end("welcoome to the student controller")
});

//Student Dashboard
router.get("/",verify,  (req, res) =>{
    res.render("dashboard")
})

//Login Page
router.get("/login", (req, res)=>{
    res.render("login")
});
router.get("register", (req, res)=>{
    res.render("login")
})


router.post("/register", (req, res)=>{    
    //Validate Registration
    const {error} = validateRegistration(req.body);

    if(error){
        return  res.render("", {error :error.details[0].message});
     }
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

router.post("/login", (req, res)=>{
     //validating the user details before submittin to database
     const {error} = validateLogin(req.body);
     if(error){
       return  res.render("login", {error :error.details[0].message});
     }
     User.findOne({email: req.body.email})
    .then(user =>{
        console.log(user);
        var token = jwt.sign(user.toJSON(),"secret",{ expiresIn: '20s' });
        res.cookie('auth',token);
        res.redirect("/student/dashboard");
    })
    .catch(err =>{
        console.error(err)
    })


})


module.exports = router;