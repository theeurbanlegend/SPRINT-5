const  mongoose = require("mongoose");

const itemSchema=new mongoose.Schema({
    itemname:{
        type:String,
        required:true
    },
    inStock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        default:"An item sold in the duka bazaar"
    },
    image: {
        type: Buffer
      }
    
},{timestamps:true})

module.exports=mongoose.model('Item',itemSchema)