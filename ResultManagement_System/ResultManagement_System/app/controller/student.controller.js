const Student=require('../model/student');
const asyncHandler=require("express-async-handler")
const { Op } = require('sequelize');

const cookie=require('cookie');
const jwt=require("jsonwebtoken");
require('dotenv').config();


exports.viewResult=asyncHandler(async(req,res)=>{
    const roll=req.params.roll_no;
    
    const student= await Student.findOne({where:{roll_no:roll}
    });
    const originalDate = new Date(student.dob);
    const formattedDate = originalDate.toISOString().slice(0, 10); 
    student.dob=formattedDate;
    res.send(student);

});
exports.loginstudent=asyncHandler(async(req,res)=>{
        
    const{roll_no,dob}=req.body;
    const student= await Student.findOne({where:{roll_no:roll_no,
        dob: {
            [Op.eq]:dob
          }
    }});
     if(!student){
        
        return res.render('student/login',{
            message:'Student not found'
        })
     }
   
    const token=jwt.sign({
        name: student.name,
        dob: student.dob,
        roll_no: student.roll_no,
    },process.env.ACCESS_TOKEN_SECERT,{
        expiresIn:86400, 
      });
      console.log(token);
    res.cookie("stoken",token);
    res.send(token);
    });
    
    