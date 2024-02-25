const express=require('express')
const teacherController=require('../controller/teacher.controller')
const teacherVerifyForm=require('../middleware/teacherVerifyForm')
const routes=express.Router();
const student=require('../middleware/studentverify')
const teacherRenderService=require('../service/teacher_render');
const teacherAuth=require('../middleware/techerAuth');
const tokenHandlar=require('../middleware/TeachertokenHandler')
routes.get("/add-student",[teacherAuth.RestrictToLoggedinTeacherOnly],teacherRenderService.addStudent);
routes.get("/register",teacherRenderService.register);
routes.get("/login",teacherRenderService.login);
routes.get("/update-student/:roll_no",[teacherAuth.RestrictToLoggedinTeacherOnly],teacherRenderService.updateStudents);
routes.get("/view-student",[teacherAuth.RestrictToLoggedinTeacherOnly],teacherRenderService.viewStudent);
routes.get("/delete-student/:roll_no",teacherRenderService.deleteStudent);
routes.get('/logout',(req,res)=>{
     res.redirect("/teacher/login");
});


// form data
routes.post("/add-student",[teacherVerifyForm.checkStudentAddForm],teacherRenderService.addedStudent);
routes.post("/update",[teacherVerifyForm.checkUpdateForm],teacherRenderService.updatedStudent)
routes.post("/register",[teacherVerifyForm.checkemailExist],teacherController.registerTeacher);
routes.post("/login",teacherController.loginteacher);


// api
routes.post("/addStudent",tokenHandlar,teacherController.addStudent)
routes.put("/updateStudent",tokenHandlar,teacherController.updateStudent)
routes.delete("/deleteStudent/:roll_no",tokenHandlar,teacherController.deleteStudent)
routes.get("/getStudent",tokenHandlar,teacherController.viewAllStudents);
routes.get("/getStudent/:roll_no",tokenHandlar,teacherController.viewAllStudents)
module.exports=routes;

