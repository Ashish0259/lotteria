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
    tktstatus:{
        type:String,
        default:'not_sold'
    },
    matchstatus:{
        type:String,
        default:'ongoing'                  //Ongoing,Completed,Upcoming,Cancelled
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
    owner:{
        type:String,
        default:'no_owner'
    },
    ownerName:{
        type:String,
        default:'no_owner' 
    }
}) 

module.exports = mongoose.model(`${todaysid}`,LotteryModel);