const  mongoose = require("mongoose");

const employeeSchema=new mongoose.Schema({
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
        default:["Employee"],
        
    }],
    checkinDate:{
        type:Date
    }
    
},{timestamps:true})

module.exports=mongoose.model('Employee',employeeSchema)