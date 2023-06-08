const mongoose = require('mongoose')

var getcurrentDate = new Date()

var todaysid = "LtryResultTest"+"ltid"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

const LtryResultModel = new mongoose.Schema({
    resultdata:{
        type:Array,
        required:true
    }
}) 

module.exports = mongoose.model(`${todaysid}`,LtryResultModel);