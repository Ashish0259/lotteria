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
    },
    accuracy:{
        type:String,
        default:'0'
    },
    balance:{
        type:String,
        default:'0'
    },
    matches:{
        type:String,
        default:'0'
    },
    rank:{
        type:String,
        default:'0'
    }
});

module.exports = mongoose.model('User',userSchema);