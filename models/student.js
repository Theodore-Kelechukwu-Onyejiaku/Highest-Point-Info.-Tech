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
    username: {
        type:String},
    password: {type:
        String}
})

mongoose.model('Student', studentSchema);