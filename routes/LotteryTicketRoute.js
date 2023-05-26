const express = require('express')
const LotteryRouter = express.Router();
const LotteryModel = require('../models/LotteryModel')


//CREATE LOTTERY TICKETS
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
                          //ADD TIME TO GOLD TICKETS 
                          let hh = 8
                          if(i == 1){
                            newLotterynum.openingTime = (hh)
                            newLotterynum.closingTime = (hh+4)
                          }
                          if(i == 2){
                            newLotterynum.openingTime = (hh+2)
                            newLotterynum.closingTime = (hh+6)
                          }
                          if(i == 3){
                            newLotterynum.openingTime = (hh+4)
                            newLotterynum.closingTime = (hh+8)
                          }
                          if(i == 4){
                            newLotterynum.openingTime = (hh+6)
                            newLotterynum.closingTime = (hh+10)
                          }
                          if(i == 5){
                            newLotterynum.openingTime = (hh+6)
                            newLotterynum.closingTime = (hh+12)
                          }
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
                //ADD TIME TO SILVER TICKETS 
                let hh = 9
                if(i == 6){
                  newLotterynum.openingTime = (hh)
                  newLotterynum.closingTime = (hh+3)
                }
                if(i == 7){
                  newLotterynum.openingTime = (hh+1)
                  newLotterynum.closingTime = (hh+4)
                }
                if(i == 8){
                  newLotterynum.openingTime = (hh+2)
                  newLotterynum.closingTime = (hh+5)
                }
                if(i == 9){
                  newLotterynum.openingTime = (hh+3)
                  newLotterynum.closingTime = (hh+6)
                }
                if(i == 10){
                  newLotterynum.openingTime = (hh+4)
                  newLotterynum.closingTime = (hh+7)
                }
                if(i ==11){
                    newLotterynum.openingTime = (hh+5)
                    newLotterynum.closingTime = (hh+8)
                  }
                  if(i == 12){
                    newLotterynum.openingTime = (hh+6)
                    newLotterynum.closingTime = (hh+9)
                  }
                  if(i == 13){
                    newLotterynum.openingTime = (hh+7)
                    newLotterynum.closingTime = (hh+10)
                  }
                  if(i == 14){
                    newLotterynum.openingTime = (hh+8)
                    newLotterynum.closingTime = (hh+11)
                  }
                  if(i == 15){
                    newLotterynum.openingTime = (hh+9)
                    newLotterynum.closingTime = (hh+12)
                  }
                newLotterynum.matchID = "LTS"+(getcurrentDate.getFullYear()%100)+ (getcurrentDate.getMonth()+1)+  getcurrentDate.getDate()+(i-5)
                await newLotterynum.save()
            }
            }//
            if( i>=16 && i<31){
                for(j=1;j<11;j++){
                let newLotterynum = new LotteryModel();
                newLotterynum.ticketNo = "LTB"+(getcurrentDate.getFullYear()%100)+
                                         (getcurrentDate.getMonth()+1)+ 
                                         getcurrentDate.getDate()+(i-15)+(j)+
                                         (Math.floor(Math.random()*(999-100+1)+100)).toString()
            newLotterynum.category = "Bronze"
            newLotterynum.price = "35" 
            //ADD TIME TO GOLD TICKETS 
            let hh = 8
            if(i == 16){
              newLotterynum.openingTime = (hh)
              newLotterynum.closingTime = (hh+2)
            }
            if(i == 17){
              newLotterynum.openingTime = (hh+1)
              newLotterynum.closingTime = (hh+3)
            }
            if(i == 18){
              newLotterynum.openingTime = (hh+2)
              newLotterynum.closingTime = (hh+4)
            }
            if(i == 19){
              newLotterynum.openingTime = (hh+3)
              newLotterynum.closingTime = (hh+5)
            }
            if(i == 20){
              newLotterynum.openingTime = (hh+4)
              newLotterynum.closingTime = (hh+6)
            }
            if(i == 21){
              newLotterynum.openingTime = (hh+5)
              newLotterynum.closingTime = (hh+7)
            }
            if(i == 22){
              newLotterynum.openingTime = (hh+6)
              newLotterynum.closingTime = (hh+8)
            }
            if(i == 23){
              newLotterynum.openingTime = (hh+7)
              newLotterynum.closingTime = (hh+9)
            }
            if(i == 24){
              newLotterynum.openingTime = (hh+8)
              newLotterynum.closingTime = (hh+10)
            }
            if(i == 25){
              newLotterynum.openingTime = (hh+9)
              newLotterynum.closingTime = (hh+11)
            }
            if(i ==26){
                newLotterynum.openingTime = (hh+10)
                newLotterynum.closingTime = (hh+12)
              }
              if(i == 27){
                newLotterynum.openingTime = (hh+11)
                newLotterynum.closingTime = (hh+13)
              }
              if(i == 28){
                newLotterynum.openingTime = (hh+12)
                newLotterynum.closingTime = (hh+14)
              }
              if(i == 29){
                newLotterynum.openingTime = (hh+13)
                newLotterynum.closingTime = (hh+15)
              }
              if(i == 30){
                newLotterynum.openingTime = (hh+14)
                newLotterynum.closingTime = (hh+16)
              }
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

// GET LOTTERY TICKETS
LotteryRouter.get('/getlotterynos',async(req,res,next) =>{
    try {
        const tickets = await LotteryModel.find({});
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
} )


// GET LOTTERY TICKETTS OF CURRENT TIME OR ONGOING MATCHES
LotteryRouter.get('/ongoing',async(req,res,next) =>{
    try {
        let date = new Date(); 
        let hh = date.getHours();
        //const tickets = await LotteryModel.find({openingTime: $and[{$gte:hh},{$gt:hh}] });
        const tickets = await LotteryModel.find({
          $or:[
                {openingTime:{$eq:hh}},
                {$and:[
                  {closingTime:{$gt:hh}},
                  {openingTime:{$lt:hh}}
                      ]
                }
                ]});
        res.status(200).json({
          success:true,
          data:tickets
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success:false,
          message:error.message
        });
    }
} )


//GET LOTTERY TICKETS OF UPCOMING MATCHES
LotteryRouter.get('/upcoming',async(req,res,next) =>{
    try {
        let date = new Date(); 
        let hh = date.getHours();
        //const tickets = await LotteryModel.find({openingTime: $and[{$gte:hh},{$gt:hh}] });
        const tickets = await LotteryModel.find({openingTime:{$gt:hh}});
        res.status(200).json({
          success:true,
          data:tickets
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success:false,
          message:"No Upcoming Matches"});
    }
} )

//GET LOTTERY TICKETS OF COMPLETED MATCHES
LotteryRouter.get('/completed',async(req,res,next) =>{
    try {
        let date = new Date(); 
        let hh = date.getHours();
        //const tickets = await LotteryModel.find({openingTime: $and[{$gte:hh},{$gt:hh}] });
        const tickets = await LotteryModel.find({closingTime:{$lt:hh}});
        res.status(200).json({
          success:true,
          data:tickets
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success:false,
          message:"No Match Completed"
        });
    }
} )


//find tickets of a particular match
LotteryRouter.get('/:matchID',async(req,res,next) =>{
    try {
     const { matchID } = req.params;
     if(!matchID){
         return res.status(400).json({
             msg:'Match Id required'
         })
         
     }
     const matchid = await LotteryModel.find({matchID:matchID});
     res.status(200).json({
         success:true,
         data:matchid
     })
    } catch (error) {
     console.log(error);
     res.status(500).json({
         msg:'Error'
     })
    }
    
     
 } )
 

module.exports = LotteryRouter;
