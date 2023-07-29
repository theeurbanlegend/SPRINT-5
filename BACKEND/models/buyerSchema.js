const  mongoose = require("mongoose");

const buyerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[{
        type:String,
        default:["User"],
    }],
    cartItems:[{
        type:mongoose.Types.ObjectId,
        ref:'Item'
    }]
    
},{timestamps:true})

module.exports=mongoose.model('Buyer',buyerSchema)