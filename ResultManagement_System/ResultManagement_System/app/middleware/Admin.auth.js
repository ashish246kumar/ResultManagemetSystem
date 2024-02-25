
const jwt=require("jsonwebtoken");
require('dotenv').config();

const restrictToLoggedinAdminOnly=async(req,res,next)=>{
    const Token = req.cookies?.adminToken;
   
    if (!Token){
      
        return res.redirect("/admin/login");
    } 
    
    const tech =jwt.verify(Token,process.env.ACCESS_TOKEN_SECERT);
   
    if (!tech) {
        
        return res.redirect("/admin/login");
    }
  
    req.admin =tech;
    next();
}



module.exports={
   
    RestrictToLoggedinAdminOnly:restrictToLoggedinAdminOnly
}