const asyncHandler=require('express-async-handler')
const mongoose = require('mongoose')
const Message=require('../models/messageSchema')

const getMessages=asyncHandler(async(req,res)=>{
    const messages=await Message.find().lean().exec()
    if(!messages||messages.length===0)return res.status(404).json({
        status:"No Messages in database"
    })
    res.status(200).json(messages)
})
const addMessages=asyncHandler(async(req,res)=>{
    const {message,sender}=req.body
    if(!message||!sender){
        return res.status(400).json({
            status:"All Fields Are Required"
        })
    } 

    const newMessage={message, sender}
    const savedMessage=await Message.create(newMessage)
    res.status(200).json({
        status:"Message added successfully to Db",
        mess:savedMessage
    })

})
const updateMessages=asyncHandler(async(req,res)=>{
    const {message,sender}=req.body
    const {id}=req.params
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        status:'Proper message ID Required!!'
    })}
    const foundMessage=await Message.findById(id)
    if(!foundMessage){
        return res.status(404).json({
        status:"Error! message not found"
    })}
    foundMessage.message=message
    foundMessage.sender=sender

    const updatedMessage=await foundMessage.save()
    res.status(200).json({
        status:`Message ${updatedMessage.message} updated`
    })
})
const removeMessages=asyncHandler(async(req,res)=>{
    const id=req.params.id
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        status:'Proper Message ID Required!!'
    })}
    const message=await Message.findByIdAndDelete(id)
    if(!message){
        return res.status(404).json({
        status:"Error! Message not found"
    })}
    res.status(200).json({
        status:`Message ${message.message} has been erased from the database`
    })
})
module.exports={
    getMessages,addMessages,updateMessages,removeMessages
}