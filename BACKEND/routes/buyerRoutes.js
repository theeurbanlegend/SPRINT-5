const router=require('express').Router()

const { getBuyers, updateBuyers, removeBuyers }=require('../controllers/buyerController')
const verifyToken=require('../middleware/jwtVerify')
router.use(verifyToken)

router.route('/')
.get(getBuyers)
router.route('/:id')
.patch(updateBuyers)
.delete(removeBuyers)


module.exports=router