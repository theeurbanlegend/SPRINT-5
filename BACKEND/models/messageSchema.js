const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    message:{
        type:String
    },
    sender:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('Message',messageSchema)