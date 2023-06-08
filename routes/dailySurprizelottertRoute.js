const express = require('express')
const DailyLtry = express.Router();
const DailySurpLtryModel = require('../models/DailySurprizeLtryModel');
const DailySurprizeLtryModel = require('../models/DailySurprizeLtryModel');


// Add A GENERATED LOTTERY NUMBER 
DailyLtry.post('/addSurpDaily',async(req,res,next)=>{
    const {ticketNo,price,playerID} = req.body;
    try {
        let ticket_exist = await DailySurpLtryModel.findOne({ticketNo : ticketNo})
        
        if(ticket_exist){
            return res.json({
                success: false,
                msg:'Ticket Already Exist, Try Some Other Ticket'
            });
        }
        let player_exist = await DailySurpLtryModel.findOne({playerID : playerID})
        
        if(player_exist){
            return res.json({
                success: false,
                msg:'You Have Already Bought Ticket'
            });
        }

        let SurpDailyData = new DailySurpLtryModel();
        SurpDailyData.ticketNo = ticketNo;
        SurpDailyData.price = price;
        SurpDailyData.playerID = playerID;
    
            await SurpDailyData.save()
            res.status(200).json({
                success:true,
                ticketsdata:SurpDailyData
            })
    } catch (error) {
        console.log(error)
    }
})

// GET GENERATED LOTTERY NUMBERS

DailyLtry.get('/getSurpDailydata',async(req,res,next)=>{
    try {
        const tickets = await DailySurpLtryModel.find({});
        res.status(200).json({   
            success:true,
            tickets:tickets
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})

// GET GENERATED LOTTERY NUMBER WITH ID
DailyLtry.get('/getSurpDailydata/:playerid',async(req,res,next)=>{
    const {playerid} = req.params;

    try {
        let player_Exist = await DailySurpLtryModel.findOne({playerID : playerid})
        
        if(!player_Exist){
            return res.status(400).json({
                success: false,
                msg:'Player ID required'
            });
        }
        const playerData = await DailySurpLtryModel.findOne({playerID:playerid});
        res.status(200).json({   
            success:true,
            playerData:playerData
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})




module.exports = DailyLtry ;