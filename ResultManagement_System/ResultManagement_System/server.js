const express=require("express");
const hbs=require('hbs');
const sequelize=require("./app/config/database_config")
const asyncHandler=require('express-async-handler')
const cookieParser = require('cookie-parser');
const path = require("path");
// const Student=require('./app/model');
const admin=require('./app/model/Admin')
const Atdata=require('./app/model/AdminPermission')
const studentRoute=require('./app/routes/student.auth.route');
const teacherRoute=require('./app/routes/teacher.auth.route');
const adminRoute=require('./app/routes/admin.routes')
const app=express();
app.use(cookieParser());
require('dotenv').config()
app.listen(process.env.PORT|5001,()=>{
    console.log("app started");
})
app.set('view engine','hbs')
app.set('views','views')
app.use('/static',express.static("public"));

  
    
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());


// Database
sequelize.sync();


// routes
app.use('/',studentRoute);
app.use('/teacher',teacherRoute);
app.use('/admin',adminRoute);
hbs.registerPartials("views/partials");

const mydbConnection=asyncHandler(async()=>{
    
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
});
mydbConnection()