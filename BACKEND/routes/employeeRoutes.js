const router=require('express').Router()
const { getEmployees, addEmployees, updateEmployees, removeEmployees }=require('../controllers/employeeController')

const verifyToken=require('../middleware/jwtVerify')
router.use(verifyToken)


router.route('/')
.get(getEmployees)
.post(addEmployees)
router.route('/:id')
.patch(updateEmployees)
.delete(removeEmployees)



module.exports=router