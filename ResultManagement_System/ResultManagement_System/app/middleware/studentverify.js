const Student=require('../model/student');
const asyncHandler=require("express-async-handler");
const { Op } = require('sequelize');
checkLoginForm=asyncHandler(async(req,res,next)=>{
    
    const{roll_no,dob}=req.body;
   
    if(!roll_no || !dob){
        
        return res.render('student/login',{
            message:'please fill all the field'
        })
    }
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
    next();
});



const verifyStudent={
    checkLoginForm:checkLoginForm
    
}
module.exports=verifyStudent;