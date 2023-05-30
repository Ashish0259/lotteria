const express = require('express')
const UserData = express.Router();
const AddUserDataModel = require('../models/AddUserDataModel')
//const bcryptjs = require('bcryptjs')

// ADD USER DATA TO DATABASE
UserData.post('/adduserdata',async(req,res,next)=>{
    const {email,fullName,password} = req.body;
    try {
        let user_Exist = await AddUserDataModel.findOne({email : email})
        
        if(user_Exist){
            return res.json({
                success: false,
                msg:'user already exist'
            });
        }
        let userData = new AddUserDataModel();
            userData.email = email;
            userData.fullName = fullName;

    
           // const salt = await bcryptjs.genSalt(10);
           // userData.password = await bcryptjs.hash(password,salt);

           userData.password = password;
    
            await userData.save()
            res.status(200).json({
                success:true,
                userdata:userData
            })
    } catch (error) {
        console.log(error)
    }
})

// GET ALL USERS DATA FROM DATABASE
UserData.get('/getusersdata',async(req,res,next)=>{
    try {
        const users = await AddUserDataModel.find({});
        res.status(200).json({   
            success:true,
            users:users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})

// GET USER WITH ID
UserData.get('/getusersdata/:id',async(req,res,next)=>{
    const {id} = req.params;

    try {
        let user_Exist = await AddUserDataModel.findOne({_id : id})
        
        if(!user_Exist){
            return res.status(400).json({
                success: false,
                msg:'Email required'
            });
        }
        const user = await AddUserDataModel.findOne({_id:id});
        res.status(200).json({   
            success:true,
            user:user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})

// GET USER DATA WITH EMAIL
UserData.get('/getuserdata/:email',async(req,res,next)=>{
    const {email} = req.params;

    try {
        let user_Exist = await AddUserDataModel.findOne({email : email})
        
        if(!user_Exist){
            return res.status(400).json({
                success: false,
                msg:'Email required'
            });
        }
        const user = await AddUserDataModel.findOne({email:email});
        res.status(200).json({   
            success:true,
            user:user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
    }
})

//UPDATE USER DATA WITH ID
UserData.put('/updatebalance/:id',async(req,res,next)=>{
try {
    let BalanceData = await AddUserDataModel.findById(req.params.id);
    if(!BalanceData){
        return res.status(400).json({
            success:false,
            msg:'Does not exist'
        })
    } 
    BalanceData = await AddUserDataModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!BalanceData){
        return res.status(400).json({
            success:false,
            msg:'Something Went Wrong',
            data:BalanceData
        })
    }
    res.status(200).json({
        success:true,
        msg:'Successfully Updated',

    })
} catch (error) {
    console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message});
}
 
})



module.exports = UserData ;

