const express = require('express')
const ResultLottery = express.Router();
const AddUserDataModel = require('../models/AddUserDataModel')
const LotteryModel = require('../models/LotteryModel')
const LtryResultModel = require('../models/LotteryResultModel');
const LotteryResultModelTest = require('../models/LotteryResultModelTest');
const { json } = require('body-parser');
const LotteryResultModel = require('../models/LotteryResultModel');

// Array for storing matches id
var arr2 = [];

//URL FOR COMPLETED MATCHES
serverUrl1 = "https://mylotteria.onrender.com/api/lotteryapp/tickets/completed";
url1 = "http://localhost:3000/api/lotteryapp/tickets/completed";

//URL FOR GETTING TICKETS OF MATCH ID
var urlArray = [];
serverurl2 = "https://mylotteria.onrender.com/api/lotteryapp/tickets/";
url2 = "http://localhost:3000/api/lotteryapp/tickets/";

//URL FOR GETTING SURPRISE LOTTERY TICKETS
serverSurl = "https://mylotteria.onrender.com/api/lotteryapp/dailysurp/getSurpDailydata";
Surl = "http://localhost:3000/api/lotteryapp/dailysurp/getSurpDailydata";

//FUNCTION TO GET COMPLETED MATCHES
async function getcompletedmatches(url1) {
    return fetch(url1)
    .then(response => {
  //console.log(response); // Logs the response
  return response.json();
  }
);
}

//FUNCTION TO GET TICKETS ACCORDING TO MATCHID
async function getticketsofmatches(url){
    return fetch(url)
    .then(response2 =>{
        
        return response2.json();
    })
}

//FUNCTION TO GET SURPRISE LOTTERY TICKETS
async function getsurpLtryTkts(surl){
    return fetch(surl)
    .then(response3 =>{
        return response3.json();
    })
}

// Add Lottery Results
ResultLottery.post('/addLtryResult',async (req,res,next)=>{
    try {
        
        getcompletedmatches(url1).then(async function(result1){
            let date = new Date(); 
            let hh = date.getHours();
            var newResult = JSON.stringify(result1);
            let arr1 = JSON.parse(newResult) 

            for(var i=0; i < Object.keys(arr1.data).length;i++){
                if(arr1.data[i].closingTime == hh){
                    arr2.push(arr1.data[i].matchID)
                    urlArray.push(url2+arr1.data[i].matchID)
                    
                    }
            }
            //console.log(arr2)
            //console.log(urlArray)
            for(var i = 0;i<Object.keys(arr2).length;i++){
            
                getticketsofmatches(urlArray[i]).then(async function(result){
                    var newResult = JSON.stringify(result)
                    var obj = JSON.parse(newResult)
                            let lotteryresult = new LotteryResultModel();
                            lotteryresult.matchID = obj.data[i].matchID;
                            lotteryresult.category = obj.data[i].category;
                            lotteryresult.openingTime = obj.data[i].openingTime;
                            lotteryresult.closingTime = obj.data[i].closingTime;
                            let randArray = [];
                            for (var j=0; j < 3; j++) {
                            var randNum =  Math.floor(Math.random()*(9-0+1) + 0);
                            randArray.push(randNum);
                            }
                            lotteryresult.win1tktNo = obj.data[randArray[0]].ticketNo;
                            lotteryresult.win1ID = obj.data[randArray[0]].owner;
                            
                            lotteryresult.win2tktNo = obj.data[randArray[1]].ticketNo;
                            lotteryresult.win2ID = obj.data[randArray[1]].owner;
                            
                            lotteryresult.win3tktNo = obj.data[randArray[2]].ticketNo;
                            lotteryresult.win3ID = obj.data[randArray[2]].owner;
                            await lotteryresult.save()
                            
                })
                }
        })
        
            res.status(200).json({
                success:true
            })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success:false,
          message:"No Match Completed"
        });
    }
})

// Get ALL Results
ResultLottery.get('/getLtryResult',async (req,res,next)=>{
    try {
        const results = await LotteryResultModel.find({});
        res.status(200).json({   
            success:true,
            results:results
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})



// GET RESULT WITH MATCH ID
ResultLottery.get('/getLtryResult/:matchid',async(req,res,next)=>{
    const {matchid} = req.params;

    try {
        let result_Exist = await LotteryResultModel.findOne({matchID : matchid})
        
        if(!result_Exist){
            return res.status(400).json({
                success: false,
                msg:'Match ID  required'
            });
        }
        const result = await LotteryResultModel.findOne({matchID:matchid});
        res.status(200).json({   
            success:true,
            result:result
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})

// ADD SURPRISE LOTTERY RESULT
ResultLottery.post('/addSurpLtryResult',async (req,res,next)=>{
    try {
        getsurpLtryTkts()
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success:false,
          message:"No Match Completed"
        });
    }
})
module.exports = ResultLottery ;