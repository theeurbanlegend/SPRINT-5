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
        type:String
    }],
    cartItems:[{
        type:mongoose.Types.ObjectId,
        ref:'Item'
    }]
    
    
},{timestamps:true})

buyerSchema.pre('save', function (next) {
    if (this.isNew && this.roles.length === 0) {
        this.roles.push("User");
    }
        next();
})     
module.exports=mongoose.model('Buyer',buyerSchema)