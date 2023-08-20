const Buyer=require('../models/buyerSchema')
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const getBuyers=asyncHandler(async(req,res)=>{
    const buyers=await Buyer.find().lean().exec()
    if(!buyers||buyers.length===0)return res.status(404).json({
        msg:"No Customers in database"
    })
    res.status(200).json(buyers)
})
const addBuyers=asyncHandler(async(req,res)=>{
    const {firstName,lastName,email,phone,username,password,roles}=req.body
    
    if(!username||!password){
        return res.status(400).json({
            msg:"All Fields Are Required"
        })
    }
    const duplicate=await Buyer.find({username:username}).lean().exec()
    if(duplicate.length!==0){
        return res.status(400).json({
            msg:"The Username is already taken"
        })
    }
    const hashedPass=await bcrypt.hash(password,10)

    const newBuyer={firstName,lastName,email,phone,username, password:hashedPass,roles}
    const savedBuyer=await Buyer.create(newBuyer)
    // Generate JWT for the newly added buyer
    const accessToken = jwt.sign(
        {
            "Info": {
                "username": savedBuyer.username,
                "roles": ["User"] // Assign default role for the user (you can customize as needed)
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    );
    res.status(200).json({
        msg:"Buyer added successfully to Db",
        user:savedBuyer,
        accessToken
    })

})
const updateBuyers=asyncHandler(async(req,res)=>{
    const {username,password}=req.body
    const id=req.params.id
    if(!id||!username||!password||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        msg:'Proper User ID and details Required!!'
    })}
    const buyer=await Buyer.findById(id)
    if(!buyer){
        return res.status(404).json({
        msg:"Error! User not found"
    })}
    buyer.username=username
    buyer.password=await bcrypt.hash(password,10)

    const updatedBuyer=await buyer.save()
    res.status(200).json({
        msg:`User ${updatedBuyer.username} updated`
    })
    
})
const removeBuyers=asyncHandler(async(req,res)=>{
    const id=req.params.id
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        msg:'Proper User ID Required!!'
    })}
    const buyer=await Buyer.findByIdAndDelete(id)
    if(!buyer){
        return res.status(404).json({
        msg:"Error! User not found"
    })}
    res.status(200).json({
        msg:`User ${buyer.username} has been erased from the database`
    })
})


module.exports={
 getBuyers,addBuyers,updateBuyers,removeBuyers
}