const asyncHandler=require('express-async-handler')
const { default: mongoose } = require('mongoose')
const Buyer = require('../models/buyerSchema')
const Item = require('../models/itemSchema')


const addtoCart=asyncHandler(async (req, res) => {
    const { buyerId, itemId } = req.body
  
    if (!buyerId || !itemId || !mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({
        status: 'Valid Buyer ID and Item ID are required'
      })
    }
  // Finds buyer using buyer id param which is actually the username
    const buyer = await Buyer.findOne({username:buyerId})
    if (!buyer) {
      return res.status(404).json({
        status: 'Error! Buyer not found'
      })
    }
  
    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).json({
        status: 'Error! Item not found'
      })
    }
  
    buyer.cartItems.unshift(item._id)
    await buyer.save()
  
    res.status(200).json({
      status: `Item ${item.itemname} added to the cart for Buyer ${buyer.username}`
    })
  })

const removefromCart=asyncHandler(async (req, res) => {
    const { buyerId, itemId } = req.body
  console.log(buyerId, itemId)
    if (!buyerId || !itemId  || !mongoose.isValidObjectId(itemId)) {
      return res.status(400).json({
        status: 'Valid Buyer ID and Item ID are required'
      })
    }
  
   // Finds buyer using buyer id param which is actually the username
   const buyer = await Buyer.findOne({username:buyerId})
   if (!buyer) {
     return res.status(404).json({
       status: 'Error! Buyer not found'
     })
   }
  
    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).json({
        status: 'Error! Item not found'
      })
    }
    if(buyer.cartItems.length===0){
        return res.status(200).json({
            status:"No items in the cart to remove"
        })
    }
  
    buyer.cartItems.pop(item._id)
    await buyer.save()
  
    res.status(200).json({
      status: `Item ${item.itemname} removed from cart for Buyer ${buyer.username}`
    })
  })

  module.exports={
    addtoCart,removefromCart
  }