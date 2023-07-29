const { addtoCart, removefromCart } = require('../controllers/buyController')

const router=require('express').Router()

router.route('/')
.post(addtoCart)
.delete(removefromCart)
module.exports=router