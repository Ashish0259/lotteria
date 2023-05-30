const mongoose = require('mongoose')

const AddUserDataModel = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accuracy:{
        type:Number,
        default:'0'
    },
    balance:{
        type:Number,
        default:'0'
    },
    matches:{
        type:Number,
        default:'0'
    },
    winmatches:{
        type:Number,
        default:'0'
    },
    earning:{
        type:Number,
        default:'0'
    }
})

module.exports = mongoose.model('UserData',AddUserDataModel);