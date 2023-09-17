const mongoose = require('mongoose')

var getcurrentDate = new Date()

var todaysid =  "Sltd"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

const DailyLtry = new mongoose.Schema({
    ticketNo:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    playerID:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true         // Daily,Weekly
    }
}) 

module.exports = mongoose.model(`${todaysid}`,DailyLtry);