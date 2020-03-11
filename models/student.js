const mongoose = require("mongoose")
const Schema = mongoose.Schema()
const studentSchema = new Schema({
    name : String,
    address: String,
    dob: String,
    email: String,
    username: String,
    password: String
})

var Student = mongoose.model('Student', studentSchema);