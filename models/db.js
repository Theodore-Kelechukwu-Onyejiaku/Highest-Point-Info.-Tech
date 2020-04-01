const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HighestPoint", {useNewUrlParser: true}, (err)=>{
    if(err){
        console.error("Error in database connection :"+err)
    }else{
        console.log("Database connection successful")
    }
})

//Registering the Student model
require("./student")

//REgistering the Course model
require("./course")