const { getStudent } = require('../service/studentTokenService');
const cookie=require('cookie');
const restrictToLoggedinStudentOnly = async (req, res, next) => {
    const Token = req.cookies?.studentToken;
    console.log(Token);
    if (!Token) {
        return res.redirect("/student/login");
    } 
    
    const stud = getStudent(Token);
  
    if (!stud) {
        return res.redirect("/student/login");
    }
  
    req.student = stud;
    next();
}

module.exports = {
    restrictToLoggedinStudentOnly: restrictToLoggedinStudentOnly,
    
};
