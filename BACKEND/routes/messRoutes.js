const router=require('express').Router()
const { getMessages, addMessages, updateMessages, removeMessages }=require('../controllers/messageController')
router.route('/')
.get(getMessages)
.post(addMessages)
router.route('/:id')
.patch(updateMessages)
.delete(removeMessages)

module.exports=router