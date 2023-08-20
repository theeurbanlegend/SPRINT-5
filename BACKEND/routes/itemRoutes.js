const router=require('express').Router()
const upload=require('../config/multer-config')
const { getItems, addItems, updateItems, removeItems }=require('../controllers/itemController')
router.route('/')
.get(getItems)
.post(upload.single('image'), addItems);
router.route('/:id')
.patch(updateItems)
.delete(removeItems)

module.exports=router