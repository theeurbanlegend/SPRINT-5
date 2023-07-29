const Employee=require('../models/employeeSchema')
const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const mongoose = require('mongoose')


const getEmployees=asyncHandler(async(req,res)=>{
    const workers=await Employee.find().lean().exec()
    if(!workers||workers.length===0)return res.status(404).json({
        msg:"No Employees in database"
    })
    res.status(200).json(workers)
})
const addEmployees=asyncHandler(async(req,res)=>{
    const {username,password,roles}=req.body
    if(!username||!password||!roles||!Array.isArray(roles)||roles.length===0){
        return res.status(400).json({
            msg:"All Fields Are Required"
        })
    }
    const duplicate=await Employee.find({username:username}).exec()
    if(duplicate.length!==0){
        return res.status(400).json({
            msg:"The Username is already taken"
        })
    }
    const hashedPass=await bcrypt.hash(password,10)

    const newEmployee={username, password:hashedPass,roles}
    const savedEmployee=await Employee.create(newEmployee)
    res.status(200).json({
        msg:"Employee added successfully to Db",
        user:savedEmployee
    })

})
const updateEmployees=asyncHandler(async(req,res)=>{
    const {username,password,roles}=req.body
    const id=req.params.id
    if(!id||!username||!password||!mongoose.isValidObjectId(id)||!roles||!Array.isArray(roles)||roles.length===0){
        return res.status(400).json({
        msg:'Proper User ID and details Required!!'
    })}
    const employee=await Employee.findById(id)
    if(!employee){
        return res.status(404).json({
        msg:"Error! User not found"
    })}
    employee.username=username
    employee.password=await bcrypt.hash(password,10)
    employee.roles=roles
    const updatedEmployee=await employee.save()
    res.status(200).json({
        msg:`User ${updatedEmployee.username} updated`
    })
})
const removeEmployees=asyncHandler(async(req,res)=>{
    const id=req.params.id
    if(!id||!mongoose.isValidObjectId(id)){
        return res.status(400).json({
        msg:'Proper User ID Required!!'
    })}
    const employee=await Employee.findByIdAndDelete(id)
    if(!employee){
        return res.status(404).json({
        msg:"Error! User not found"
    })}
    res.status(200).json({
        msg:`User ${employee.username} has been erased from the database`
    })
})


module.exports={
   getEmployees,addEmployees,updateEmployees,removeEmployees
}