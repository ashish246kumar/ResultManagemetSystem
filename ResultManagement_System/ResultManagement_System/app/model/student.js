const Sequelize=require('sequelize');
const sequelize=require('../config/database_config')
const Student=sequelize.define("student",{
    roll_no:{
        type:Sequelize.INTEGER,
        
        allowNull:false,
        primaryKey:true,
        validate: {
        notEmpty: {
            msg: 'Please add the roll no'
          },
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
    dob:{
        type:Sequelize.DATEONLY,
        allowNull:false,
        validate: {
        notEmpty: {
            msg: 'Please add dob'
          }
        }
    },
    score:{
         type:Sequelize.INTEGER,
        

    }
    
})
module.exports=Student;