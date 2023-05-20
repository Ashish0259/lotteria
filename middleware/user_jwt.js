const jwt = require('jsonwebtoken')

module.exports = async function(req,res,next){
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            msg:"No Token, authorization denied"
        })
    }

    try {
        
        await jwt.verify(token,process.env.JWTUserSecret, (err,decode)=>{
            if(err){
                res.status(401).json({
                    msg:"Token Not Valid"
                })
                }else{
                    req.user = decode.user;
                    next();
                }
            })

    } catch (error) {
        
        console.log("Something went wrong with middleware "+err);
        res.json(500).json({
            msg:"Server Error"
        })

    }
}