const mongoose = require('mongoose')

var getcurrentDate = new Date()

var todaysid =  "ltid"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

const LotteryModel = new mongoose.Schema({
    ticketNo:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Not Sold'
    },
    matchID:{
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
    serverTime:{
        type:Number,
        default:getcurrentDate.getHours()
    }
}) 

module.exports = mongoose.model(`${todaysid}`,LotteryModel);