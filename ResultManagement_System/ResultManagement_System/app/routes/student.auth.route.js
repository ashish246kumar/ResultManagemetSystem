const express=require('express')
const studentController=require('../controller/student.controller')
const studentRenderService=require('../service/student_render');
const loginverfiy=require('../middleware/studentverify')

const { restrictToLoggedinStudentOnly } = require('../middleware/student.auth'); // Correct import

const routes=express.Router();

routes.get("/student/login",studentRenderService.login)
routes.get("",studentRenderService.home)
routes.get("/student/:roll_no",[restrictToLoggedinStudentOnly],studentRenderService.viewStudent);
routes.get("/logout",studentRenderService.logout);

routes.post("/student/login",[loginverfiy.checkLoginForm],studentRenderService.postlogin);


// api
routes.get("/result/:roll_no",studentController.viewResult);
routes.post("/login",studentController.loginstudent);

module.exports=routes;

