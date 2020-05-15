const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name : {
        type:String},
    address:{
        type: String},
    dob: {
        type:String},
    email: {
        type:String},
    number: {
        type:String},
    password: {
        type:String},
    date: {
        type:Date,
        default: Date.now
    }
})

mongoose.model('Student', studentSchema);