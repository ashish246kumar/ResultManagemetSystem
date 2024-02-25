var bcrypt=require('bcryptjs')
const dbConfig=require('../config/database_config')
const jwt=require("jsonwebtoken");
const Teacher=require('../model/teacher');
const Student=require('../model/student')
const asyncHandler=require("express-async-handler")
const { Op } = require('sequelize');
const AHTdata=require('../model/AdminPermission')
require('dotenv').config();

//register teacher

exports.registerTeacher=asyncHandler(async(req,res)=>{
    
  const{name,email,password}=req.body;

  const teacher=await AHTdata.create({
        
        name:name,
        email:email,
        password:bcrypt.hashSync(password,8),
       
    })
  
  
  return res.redirect("/teacher/login");

    
}

);

// login teacher
exports.loginteacher=asyncHandler(async(req,res)=>{
        
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"All the Fields are Mandatory"})

    }
   
    const teacher= await Teacher.findOne({where:{email:email
       
    }});
     if(teacher&&(bcrypt.compareSync(password,teacher.password))){
        const teacherToken =jwt.sign({
          teacher:{
          name: teacher.name,
          email: teacher.email,
          id: teacher.id
        },
      },process.env.ACCESS_TOKEN_SECERT,{
          expiresIn:"60m", 
        })
        
        res.cookie("teacherToken",teacherToken);
        
       console.log("controller"+teacherToken);
          return res.redirect("/teacher/view-student");
          
     }
     else{
        
          return res.render("teacher/login",{
            message:"Wrong Creditinals"
          })
     }
    
    });
    
    // view student
    exports.viewAllStudents=asyncHandler(async(req,res)=>{
                
                if(req.params.roll_no){

                  const roll=req.params.roll_no;
                
                    const data=await Student.findOne({
                        where: {
                          roll_no: roll
                        }
                      })
                      const originalDate = new Date(data.dob);
                      const formattedDate = originalDate.toISOString().slice(0, 10); 
                      data.dob=formattedDate;
                   if(data){
                    return res.send(data)
                   }
                   else{
                    res.status(404).send({ message : "Not found Student with rollNo "+ roll})
                   }    
                }
                else{
                    const data=await Student.findAll();
                    for (let i = 0; i < data.length; i++) {
                      const originalDate = new Date(data[i].dob);
                      const formattedDate = originalDate.toISOString().slice(0, 10); 
                      data[i].dob=formattedDate;
                    }
                    res.send(data)
                 }
    })

    // updateStudent
exports.updateStudent=asyncHandler(async(req,res)=>{
       
            const roll=req.body.roll_no;
            
            const [affectedRows] = await Student.update(req.body,{
                where: { roll_no: roll }
              }
              );
              if(affectedRows>0){
                const updatedStudent = await Student.findByPk(roll);
                
                res.send(updatedStudent);
              } 
              else{
                res.status(404).send({ message : "Not able to update Student with roll no "+ roll})
                }  
   });

  //  addStudent
  exports.addStudent=asyncHandler(async(req,res)=>{
             if(!req.body){
                return res.status(400).send({ message : "Content can not be emtpy!"});
                
             }
             const{roll_no,name,dob,score}=req.body;
     
    const student=await Student.create({
        roll_no:roll_no,
        name:name,
        dob:dob,
        score:score
    })
    if(student){
     
        return res.send(student);

    }
    return res.status(500).send({ message : "Some error while creating Student"});

  });

// deleteStudent
exports.deleteStudent=asyncHandler(async(req,res)=>{
  
    const roll=req.params.roll_no;
   
    if(!roll){
        return res.status(404).send({ message : "Not able to delete Student with roll no "+ roll})
    }
    const affectedRows = await Student.destroy({
        where: { roll_no:roll }
      });
      
      if (affectedRows > 0) {
        return res.send({ message: 'Student deleted successfully' });
      } else {
        return res.status(404).send({ message: `Student with roll_no ${roll} not found` });
      }
  
});
