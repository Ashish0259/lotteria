const mongoose = require('mongoose')

var getcurrentDate = new Date()

var todaysid =  "ltid"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

const LtryResultModel = new mongoose.Schema({
    matchID:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    openingTime:{
        type:Number,
        required:true
    },
    closingTime:{
        type:Number,
        required:true
    },
    win1ID:{
        type:String,
        default:'no_owner'
        
    },
    win1tktNo:{
        type:String,
        default:'no_owner'
    },
    win1Name:{
        type:String,
        default:'no_owner'
    },
    win2ID:{
        type:String,
        default:'no_owner'
    },
    win2tktNo:{
        type:String,
        default:'no_owner'
    },
    win2Name:{
        type:String,
        default:'no_owner'
    },
    win3ID:{
        type:String,
        default:'no_owner'
    },
    win3tktNo:{
        type:String,
        default:'no_owner'
    },
    win3Name:{
        type:String,
        default:'no_owner'
    }
}) 

module.exports = mongoose.model("LtryResult"+`${todaysid}`,LtryResultModel);