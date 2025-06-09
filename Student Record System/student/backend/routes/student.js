const express = require('express');
const student = require('../models/student');
const router = express.Router();
//const fetchstudent=require('../middleware/fetchstudent);
// const {body,validationResult} = require('express-validator');
// const bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');


//Router:1 Add student  POST:"/api/student/" to add students
router.post('/', async (req,res)=>{
    try {
        const {name,roll_no,course} = req.body; //destructing
        const existstudent=await student.findOne({roll_no});
        if(existstudent){
            return res.status(400).json({error:"Student is already exists"});
        }
        const studentdata = await student.create({
            name,
            roll_no,
            course
        });
        //const data=await student.save();
        return res.status(200).json(studentdata);
    } catch (error) {
        return res.status(500).send({error:"Internal Server Error"});
    }
})


//Router:2 Return all student GET:"/api/student/" 
router.get('/',async(req,res)=>{
    try{
        const studentdata = await student.find();
        //console.log('data fetched');
        res.status(200).json(studentdata);
    }
    catch(error){
        return res.status(500).send({error:"Internal Server Error"});   
}
})


//Router:3 Get student by roll_no GET: "/api/student/:roll_no"
router.get('/:roll_no',async(req,res)=>{
try {
   const studentdata = await student.findOne({roll_no:req.params.roll_no});
   if(!studentdata){
    return res.status(404).json({error:'student not found'});
   }else{
       res.status(200).json(studentdata)
    }
}    
catch (error) {
      return res.status(500).send({error:"Internal Server Error"});   
    }

})


//Router:4 Update student by roll_no PUT:"/api/student/:roll_no"
router.put('/:roll_no',async(req,res)=>{
    try {
        //const roll_no=req.params.roll_no;
        const responsedata = await student.findOneAndUpdate({roll_no:req.params.roll_no},req.body,{new:true});
        if(!responsedata){
            return res.status(404).json({error:'update fail'});
        }else{
            res.json(responsedata);
        }
    } catch (error) {
        return res.status(500).send({error:"Internal Server Error"});
    }
})

//Router:5 Delete student by roll_no DELETE:"/api/student/:roll_no"
router.delete('/:roll_no',async(req,res)=>{
try {
    const deletedStudent = await student.findOneAndDelete({roll_no:req.params.roll_no});
    if(!deletedStudent){
        return res.status(404).json({error:'student not found'});
    }
    else{
        return res.json({message:'student deleted successfully'});
    }
} catch (error) {
    return res.status(500).send({error:"Internal Server Error"});
}
})
//Router:6 search by name or course  GET:"/api/student/search"
module.exports = router;
