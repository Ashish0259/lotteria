const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);