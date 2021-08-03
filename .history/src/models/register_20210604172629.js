const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

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
    password:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tokens:[{
        token: {
            type: String,
            required: true,
        }
    }
    ]
})
// statics
// statics are the methods defined on the model object
// Use .statics for static methods.

// methods
// methods are defined on the document (instance).
// Use .methods for instance methods.
studentSchema.methods.generateAuthToken = async function(){
    try{
        const tokenGenerated = await jsonwebtoken.sign( { _id: this._id }, "jsonWebTokenSecretKeyHaving32BitOrCharacterKeyAtleast" )
        this.tokens = this.tokens.concat({token : tokenGenerated})
        await this.save();
        return tokenGenerated;
    }   
    catch(err){
        console.log("==ERROR CATCHED==>", err);
    }
};

studentSchema.pre("save", async function (next){
    // const hashedBcryptPassword = await bcryptjs.hash(password, 10);
    console.log(`hashed password of password ${this.password} is ==`);
    this.password = await bcryptjs.hash(this.password, 10); 
    next();
});
// creating a collection of Student 
const studentModel = new mongoose.model("Student", studentSchema);

module.exports = studentModel;