const Sequelize=require('sequelize');
const sequelize=require('../config/database_config')
const AdminTdata=sequelize.define("adminTdata",{
    id:{
        type:Sequelize.INTEGER,
        
        autoIncrement:true,
        primaryKey:true,
        
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
    email:{
        type:Sequelize.STRING,
        allowNull:false ,
        validate: {  isEmail: true,   
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
module.exports=AdminTdata;