require("./models/db")
const express = require("express");
const app = express();
const path = require("path");
const exphs = require("express-handlebars");
const bodyparser = require("body-parser");



//Importing Controllers
const studentController = require("./controllers/studentController")
const adminController = require("./controllers/adminController")

//Importing the body-parser middle ware
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//Setting Up template engine
app.set("views", path.join(__dirname,"/views/"));
app.engine("hbs", exphs({extname: "hbs", defaultLayout: "adminLayout", layoutsDir: __dirname + "/views/layouts/"}));
app.set("view engine", "hbs");

//Using Controllers
app.use("/student", studentController)
app.use("/admin", adminController)

//Static Page
app.use(express.static("public"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server running succesfully")
})