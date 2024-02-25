const Sequelize=require("sequelize")

require('dotenv').config();
console.log(process.env.PORT)
const database=process.env.DATABASE;
const host=process.env.HOST;
const password=process.env.PASSWORD;
const user=process.env.USER;
const dialect=process.env.DIALECT;
const sequelize=new Sequelize(database,user,password,{
    dialect:dialect,
    host:host,
});
module.exports=sequelize;