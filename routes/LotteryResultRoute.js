const express = require('express')
const ResultLottery = express.Router();
const AddUserDataModel = require('../models/AddUserDataModel')
const LotteryModel = require('../models/LotteryModel')
const LtryResultModel = require('../models/LotteryResultModel');
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

// URL FOR MATCH CANCELLED
var cancelURLArray = [];
cancelURL = "http://localhost:3000/api/lotteryapp/tickets/updatelottery/";

// FUNCTION TO UPDATE MATCH CANCELLED
async function updatematch(url3){
    return fetch(url3,{
        Method:'POST',
        Headers:{
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
        Body:{
            "matchstatus":"Cancel"
        }
    })
    .then(response4 =>{
        return response4.json();
    })
}

// FUNCTION TO UPDATE USERS
var userUrlArray = [];
userurl = "http://localhost:3000/api/lotteryapp/users/updatebalance/";
var request = require('request');
function updateClient(someurl){
            var clientServerOptions = {
                uri: someurl,
                body: JSON.stringify({
                  "earning":"00"
                }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response,body) {
                console.log(response.body);
                return;
            });
        }
 
//updateClient();

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
                if(arr1.data[i].closingTime == 14){
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
                    var tktcount = 0;
                    //for(var k = 0;k<Object.keys(obj.data).length;k++){
                    //    if(obj.data[k].tktstatus == Sold){
                    //        tktcount = tktcount+1;
                    //    }
                    //}
                        //if(tktcount == 10){
                            let lotteryresult = new LotteryResultModel();
                            lotteryresult.matchID = obj.data[i].matchID;
                            lotteryresult.category = obj.data[i].category;
                            lotteryresult.openingTime = obj.data[i].openingTime;
                            lotteryresult.closingTime = obj.data[i].closingTime;
                            for(var b=0;b<Object.keys(obj.data).length;b++){
                                userUrlArray.push(userurl+obj.data[b].owner)
                            }
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
                            
                            for(var a = 0;a<Object.keys(obj.data).length;a++){
                                if(!obj.data[a].tktstatus == 'not_sold'){
                                    updateClient(userUrlArray[a]);
                                }
                            }
                        //}
                        //else{
                        //    for(var l = 0;l<Object.keys(obj.data).length;l++){
                        //        cancelURLArray.push(cancelURL+obj.data[l].ticketNo)
                        //    }
                        //    for(var m = 0;m<Object.keys(cancelURLArray).length;m++){
                        //        updatematch(cancelURLArray[m]).then(async function(result3){
                        //            var matchresponse = JSON.stringify(result3)
                        //            var matchobj = JSON.parse(matchresponse)
                        //        })
                        //    }
                        //}
                    
                            
                            
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