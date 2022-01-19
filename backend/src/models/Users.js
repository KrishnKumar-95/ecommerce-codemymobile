const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3
    },
    age:{
        type: Number,
        required: true,
        min: 5,
        max: 125
    },
    email:{
        type: String,
        required: true,
        unique: [true,"Email ID Already Exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email-ID Invalid");
            }
        }
    },
    phone:{
        type: Number,
        unique: [true,"Phone Number already Exists"],
        required: true,
        min: 1000000000,
        max: 99999999999
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    confirmpassword:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    address:{
        type: String,
        required: true,
    }
});

const User = new mongoose.model("User",userSchema);

module.exports = User;