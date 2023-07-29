const router=require('express').Router()
const { getItems, addItems, updateItems, removeItems }=require('../controllers/itemController')
router.route('/')
.get(getItems)
.post(addItems)
router.route('/:id')
.patch(updateItems)
.delete(removeItems)

module.exports=router