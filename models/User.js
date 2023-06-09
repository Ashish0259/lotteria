const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phoneNumber:{
        type:Number,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    //avatar:{
    //    type:String
    //},
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
});

module.exports = mongoose.model('User',userSchema);