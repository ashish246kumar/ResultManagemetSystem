
const jwt=require("jsonwebtoken");
const restrictToLoggedinTeacherOnly=async(req,res,next)=>{
    const Token = req.cookies?.teacherToken;
   
    if (!Token){
      
        return res.redirect("/teacher/login");
    } 
    
    const tech =jwt.verify(Token,process.env.ACCESS_TOKEN_SECERT);
   
    if (!tech) {
        
        return res.redirect("/teacher/login");
    }
  
    req.teacher =tech;
    next();
}



module.exports={
   
    RestrictToLoggedinTeacherOnly:restrictToLoggedinTeacherOnly
}