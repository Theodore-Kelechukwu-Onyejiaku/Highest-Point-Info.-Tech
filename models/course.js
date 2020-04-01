const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name: {type: String},
    duration: {type: String},
    price: {type: String},
    cert:{type: String},
    ft1: {type: String},
    ft2: {type: String},
    ft3: {type: String},
    ft4: {type:String},
    ft5: {type:String},
    ft6: {type:String},
    ft7: {type:String},
    ft8: {type:String},
    ft9: {type:String},
    ft10: {type:String}
})

mongoose.model('Course', courseSchema);