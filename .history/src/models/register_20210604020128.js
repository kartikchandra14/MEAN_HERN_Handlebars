const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, "Atleast, three character must be in name !!"],
        maxlength: [60, "Maximum character allowed is 60 Only !!"]
    },
    class: {
        type: Number
    },
    rollNo: {
        type: Number,
        unique: [true, "Roll No Already Exist !!"], 
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email Already Exist !!"], 
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    mobile:{
        type:Number,
        minlength: 10,
        maxlength:10
    },
    address:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

// creating a collection of Student 
const studentModel = new mongoose.model("Student", studentSchema);

module.exports = studentModel;