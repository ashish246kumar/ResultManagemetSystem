const jwt=require("jsonwebtoken");
require('dotenv').config();
const setStudentToken=(student)=>{
   
    return jwt.sign({
        name: student.name,
        dob: student.dob,
        roll_no: student.roll_no,
    },process.env.ACCESS_TOKEN_SECERT,{
        expiresIn:"2m", 
      })
}

const getStudent=(token)=>{
      if(!token)return null;
      try{
          return jwt.verify(token,process.env.ACCESS_TOKEN_SECERT)
      }
      catch(error){
            return null;
      }
}
module.exports={
    setStudentToken,
    getStudent

}