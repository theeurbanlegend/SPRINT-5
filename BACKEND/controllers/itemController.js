const asyncHandler=require('express-async-handler')
const mongoose = require('mongoose')
const Item=require('../models/itemSchema')

const getItems=asyncHandler(async(req,res)=>{
    const items=await Item.find().lean().exec()
    if(!items||items.length===0)return res.status(404).json({
        status:"No Items in database"
    })
    res.status(200).json(items)
})
const addItems=asyncHandler(async(req,res)=>{
    const {itemname,inStock,price,desc}=req.body
    if(!itemname||!inStock||!price){
        return res.status(400).json({
            status:"All Fields Are Required"
        })
    } 

    const newItem={itemname, inStock,price,desc}
    const savedItem=await Item.create(newItem)
    res.status(200).json({
        status:"Item added successfully to Db",
        user:savedItem
    })

})
const updateItems=asyncHandler(async(req,res)=>{
    const {itemname,inStock,price,desc}=req.body
    const {id}=req.params
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        status:'Proper item ID Required!!'
    })}
    const item=await Item.findById(id)
    if(!item){
        return res.status(404).json({
        status:"Error! item not found"
    })}
    item.itemname=itemname
    item.inStock=inStock
    item.price=price
    item.desc=desc

    const updatedItem=await item.save()
    res.status(200).json({
        status:`Item ${updatedItem.itemname} updated`
    })
})
const removeItems=asyncHandler(async(req,res)=>{
    const id=req.params.id
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        status:'Proper Item ID Required!!'
    })}
    const item=await Item.findByIdAndDelete(id)
    if(!item){
        return res.status(404).json({
        status:"Error! Item not found"
    })}
    res.status(200).json({
        status:`Item ${item.itemname} has been erased from the database`
    })
})
module.exports={
    getItems,addItems,updateItems,removeItems
}