const { addBuyers } = require('../controllers/buyerController')

const router=require('express').Router()

router.route('/')
.post(addBuyers)

module.exports=router