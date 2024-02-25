const Teacher=require('../model/teacher');
const asyncHandler=require("express-async-handler");
const Student=require('../model/student')
checkemailExist=asyncHandler(async(req,res,next)=>{
    
    const{name,email,password}=req.body;

    if(!email||!name||!password){
        return res.render("teacher/register",{
            message:"All the fields are Mandatory"
          })
    }
    const teachertexist=await Teacher.findOne({
        where:{
            email:email
        }
    });
    if(teachertexist){
        
        return res.render("teacher/register",{
            message:"Teacher All ready exist"
          })
    }
    next();
});
checkUpdateForm=asyncHandler(async(req,res,next)=>{
    const{roll_no,dob,name,score}=req.body;
    if(!roll_no||!name||!dob||!score){
        return res.render("teacher/updateStudent",{
            message:"All the fields are Mandatory"
          })
    }
    next();
})
checkStudentAddForm=asyncHandler(async(req,res,next)=>{
    
    const{roll_no,name,dob,score}=req.body;
    if(!roll_no||!name||!dob||!score){
        return res.render("teacher/addStudent",{
            message:"All the fields are Mandatory"
          })
    }
    const studentexist=await Student.findOne({
        where:{
            roll_no:roll_no
        }
    });
    if(studentexist){
        return res.render("teacher/addStudent",{
            message:`Student With roll no ${roll_no}all ready exist`
          })
    }
    next();
});
const teacherVerifyForm={
    checkemailExist:checkemailExist,
    checkUpdateForm:checkUpdateForm,
    checkStudentAddForm:checkStudentAddForm
}
module.exports=teacherVerifyForm;