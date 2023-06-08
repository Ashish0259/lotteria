const mongoose = require('mongoose')

var getcurrentDate = new Date()

var todaysid =  "sltid"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

const LtryResultModel = new mongoose.Schema({
    ticketNo:{
        type:String,
        default:'no_owner'
        
    },
    tktprice:{
        type:String,
        default:'no_owner'
    },
    pricewon:{
        type:String,
        default:'no_owner'
    },
    playerID:{
        type:String,
        default:'no_owner'
    },
    playerName:{
        type:String,
        default:'no_owner'
    }
}) 

module.exports = mongoose.model("SurpLtryResult"+`${todaysid}`,LtryResultModel);