const express=require('express')
const routes=express.Router();
const adminController=require('../controller/Admin.controller')
const adminAuth=require('../middleware/Admin.auth');
const AdminAuth = require('../middleware/Admin.auth');
routes.get('/logout',(req,res)=>{
    res.clearCookie("adminToken");
   
    res.redirect('/admin/login')
})
routes.get('/login',(req,res)=>{
    res.render('admin')
})
routes.get('/register',(req,res)=>{
    res.render('adminRegister')
})
routes.get('/view',[AdminAuth.RestrictToLoggedinAdminOnly],adminController.viewAdmin);
routes.post('/login',adminController.loginadmin);
routes.post('/register',adminController.Registeradmin)
routes.post('/tdata',adminController.teacherData);
module.exports=routes
