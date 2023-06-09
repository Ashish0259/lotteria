const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcryptjs = require('bcryptjs')
//const user_jwt = require('../middleware/user_jwt');
//const jwt = require("jsonwebtoken");

//router.get('/', user_jwt, async(req, res, next) => {
//    try {
//
//        const user = await User.findById(req.user.id).select('-password');
//            res.status(200).json({
//                success: true,
//                user: user
//            });
//    } catch(error) {
//        console.log(error.message);
//        res.status(500).json({
//            success: false,
//            msg: 'Server Error'
//        })
//        next();
//    }
//});


router.post('/register',async (req,res,next) =>{
    //console.log(req.body)
    const {phoneNumber,fullName,password} = req.body;

    try {

        let user_Exist = await User.findOne({phoneNumber : phoneNumber})
        
        if(user_Exist){
            return res.json({
                success: false,
                msg:'user already exist'
            });
        }
            let user = new User();
            user.phoneNumber = phoneNumber;
            user.fullName = fullName;
    
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password,salt);
    
            //let size = 200;
            //user.avatar = "https://gravatar.com/avatar/?s="+size+"&d=retro";
    
            await user.save()

        //const payload = {user:{id:user.id}}

    //jwt.sign(payload,process.env.jwtUserSecret,{
    //    expiresIn:360000
    //},(err,token)=>{
    //    if(err) throw err;

        res.status(200).json({
            success:true,
            user:user
        })
    


    } catch (error) {

        console.log(error)

    }
})

router.post('/login', async(req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    try {

        let user = await User.findOne({
            phoneNumber: phoneNumber
        });

        if(!user) {
            return res.status(400).json({
                success: false,
                msg: 'User not exists go & register to continue.'
            });
        }


        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) {
            res.status(400).json({
                success: false,
                msg: 'Invalid password'
            });
        }

        //const payload = {user: {id: user.id}}

        //jwt.sign(payload, process.env.jwtUserSecret,
        //    { expiresIn: 360000}, (err, token) => {
        //        if(err) throw err;

                //res.status(200).json({success: true,msg: 'User logged in',token: token,user: user});
        //    }
        //)
        res.status(200).json({
            success: true,
            msg: 'User logged in',
            user: user
        });

    } catch(error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            msg: 'Server Error'
        })
    }
});

//get all user

router.get('/getusers',async(req,res,next) =>{
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
} )




router.get('/getusers/:phoneNumber',async(req,res,next) =>{
   try {
    const { phoneNumber } = req.params;
    if(!phoneNumber){
        return res.status(400).json({
            msg:'Phone number required'
        })
        
    }
    const finduser = await User.findOne({phoneNumber:phoneNumber});
    res.status(200).json({
        success:true,
        data:finduser
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({
        msg:'Error'
    })
   }
   
    
} )



module.exports = router;