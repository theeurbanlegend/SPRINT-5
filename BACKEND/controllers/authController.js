const asyncHandler=require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Buyer = require('../models/buyerSchema')
const Employee=require('../models/employeeSchema')



const checkUser=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    
    if(!username||!password){
        return res.status(400).json({
            msg:"All fields required"
        })
    }
    const verified=await Buyer.findOne({username:username}).exec()
    
    if(!verified||verified.length===0){
        return res.status(400).json({
            msg:"The Username is not found"
        })
    }else{
        const pwdMatch=await bcrypt.compare(password,verified.password)
        if (!pwdMatch){
            return res.status(400).json({
                msg:"Incorrect password"
            })
        }
        console.log(verified.roles,"undefined")
        const accessToken=jwt.sign(
            {
                "Info":{
                    "username":verified.username,
                    "roles":verified.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1m'}
        )
        const refreshToken=jwt.sign(
            {
                "Info":{
                    "username":verified.username,
                    "roles":verified.roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "10m"}//set to 7 days
        )
        
         // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT ie 7days
        })

        // Send accessToken containing username and roles 
        res.json({ accessToken })

    }

    })

const checkEmployee=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    
    if(!username||!password){
        return res.status(400).json({
            msg:"All fields required"
        })
    }
    const verified=await Employee.findOne({username:username}).exec()
    
    if(!verified||verified.length===0){
        return res.status(400).json({
            msg:"The Username is not found"
        })
    }else{
        const pwdMatch=await bcrypt.compare(password,verified.password)
        if (!pwdMatch){
            return res.status(400).json({
                msg:"Incorrect password"
            })
        }
        console.log(verified.roles)
        const accessToken=jwt.sign(
            {
                "Info":{
                    "username":verified.username,
                    "roles":verified.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '10m'}
        )
        const refreshToken=jwt.sign(
            {
                "Info":{
                    "username":verified.username,
                    "roles":verified.roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}//set to 7 days
        )
        
         // Create secure cookie with refresh token 
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT ie 7days
        })

        // Send accessToken containing username and roles 
        res.json({ accessToken,verified })

    }
})

const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(403).json({ msg: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ msg: 'Forbidden' })
            console.log(decoded.Info)
            const verified=await Employee.findOne({username:decoded.Info.username }).exec()
            const user=await Buyer.findOne({username:decoded.Info.username }).exec()
            if (!verified&&!user){
            return res.status(401).json({ msg: 'Unauthorized' })
            }else if(verified){
                console.log("employee")
                const accessToken = jwt.sign(
                    {
                        "Info": {
                            "username": verified.username,
                            "roles": verified.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                )
                return res.json({ accessToken })
            }else if(user){
                console.log("user")
                const accessToken = jwt.sign(
                    {
                        "Info": {
                            "username": user.username,
                            "roles": user.roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '5m' }
                )
                return res.json({ accessToken })
            }
            
        }))
}
// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ msg: 'Cookie cleared' })
}


module.exports={
    checkUser,checkEmployee,logout,refresh
}