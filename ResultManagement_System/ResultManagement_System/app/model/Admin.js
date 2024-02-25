const Sequelize=require('sequelize');
const sequelize=require('../config/database_config')
const Admin=sequelize.define("admin",{
    email:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false ,
        validate: {  isEmail: true,   
        }
    },
    name:{
        type:Sequelize.STRING(60) ,
        allowNull:false ,
        validate: {
        notEmpty: {
            msg: 'Please add the name'
          },   
        }  
    },
    
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        validate: {
         len: {
             args: [3],
             msg: "Password must be at least 3 characters long"
         }
     }
       
     }
    
    
})
module.exports=Admin;