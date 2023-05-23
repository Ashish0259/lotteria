const express = require('express')
const LotteryRouter = express.Router();
const LotteryModel = require('../models/LotteryModel')

LotteryRouter.post('/addlotterynos',async(req,res,next)=>{
    var getcurrentDate = new Date()

    var todaysId =  "LTID"+ (getcurrentDate.getFullYear()%100) + (getcurrentDate.getMonth()+1) + getcurrentDate.getDate();

    try {

        for(i = 1;i<31;i++){
            
            if(i < 6){
                for(j=1;j<11;j++){
                    let newLotterynum = new LotteryModel();
                    newLotterynum.ticketNo = "LTG"+(getcurrentDate.getFullYear()%100)+
                                              (getcurrentDate.getMonth()+1)+ 
                                              getcurrentDate.getDate()+(i)+(j)+
                                              (Math.floor(Math.random()*(999-100+1)+100)).toString();
                          newLotterynum.category = "Gold"
                          newLotterynum.price = "150"
                newLotterynum.matchID = "LTG"+(getcurrentDate.getFullYear()%100)+ (getcurrentDate.getMonth()+1)+  getcurrentDate.getDate()+(i)
                await newLotterynum.save()
                }
                
            }
            if( i>=6 && i<16){
                for(j=1;j<11;j++){
                let newLotterynum = new LotteryModel();
                newLotterynum.ticketNo = "LTS"+(getcurrentDate.getFullYear()%100)+
                                         (getcurrentDate.getMonth()+1)+ 
                                         getcurrentDate.getDate()+(i-5)+(j)+
                                         (Math.floor(Math.random()*(999-100+1)+100)).toString()
                newLotterynum.category = "Silver"
                newLotterynum.price = "70"
                newLotterynum.matchID = "LTS"+(getcurrentDate.getFullYear()%100)+ (getcurrentDate.getMonth()+1)+  getcurrentDate.getDate()+(i-5)
                await newLotterynum.save()
            }
            }
            if( i>=16 && i<31){
                for(j=1;j<11;j++){
                let newLotterynum = new LotteryModel();
                newLotterynum.ticketNo = "LTB"+(getcurrentDate.getFullYear()%100)+
                                         (getcurrentDate.getMonth()+1)+ 
                                         getcurrentDate.getDate()+(i-15)+(j)+
                                         (Math.floor(Math.random()*(999-100+1)+100)).toString()
            newLotterynum.category = "Bronze"
            newLotterynum.price = "35" 
            newLotterynum.matchID =  "LTB"+(getcurrentDate.getFullYear()%100)+ (getcurrentDate.getMonth()+1)+  getcurrentDate.getDate()+(i-15)  
            await newLotterynum.save()}
            }
              
        }
    


        res.status(200).json({
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
})

LotteryRouter.get('/getlotterynos',async(req,res,next) =>{
    try {
        const tickets = await LotteryModel.find({});
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
} )

module.exports = LotteryRouter;
