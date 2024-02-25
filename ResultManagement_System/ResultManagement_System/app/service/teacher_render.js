const axios = require('axios');
const cookie=require('cookie')

exports.addStudent=(req,res)=>{
    
   
    res.render('teacher/addStudent');
}
exports.addedStudent=(req,res)=>{
    let token=req.cookies.teacherToken;
    console.log("***********"+token)
    axios.post('http://localhost:5001/teacher/addStudent',req.body,{headers:{Authorization: `Bearer ${token}`}}).then(function(response){
        
        res.redirect("/teacher/view-student")
    })
    .catch(err =>{
        res.send("no able to fetch api");
   
 })
}

exports.updatedStudent=(req,res)=>{

    let token=req.cookies.teacherToken;
    axios.put('http://localhost:5001/teacher/updateStudent',req.body,{headers:{Authorization: `Bearer ${token}`}}).then(function(response){
        res.redirect("/teacher/view-student")
    })
    .catch(err =>{
        return res.render("teacher/updateStudent",{
            message:"Error in Updating Student"
          })
   
 })
}
exports.updateStudents=(req,res)=>{
   const roll=req.params.roll_no;
   let token=req.cookies.teacherToken;
    axios.get('http://localhost:5001/teacher/getStudent/'+roll,{headers:{Authorization: `Bearer ${token}`}}).then(function(response){
        res.render('teacher/updateStudent',{ alldata : response.data });
        
    })
    .catch(err =>{
        res.send("no able to fetch api");
    })
}
exports.viewStudent=(req,res)=>{
    let token=req.cookies.teacherToken;
     axios.get('http://localhost:5001/teacher/getStudent',{headers:{Authorization: `Bearer ${token}`}}).then(function(response){
        res.render('teacher/viewAllStudent', { alldata : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}
exports.deleteStudent=(req,res)=>{
    let token=req.cookies.teacherToken;
    const roll=req.params.roll_no;
    axios.delete('http://localhost:5001/teacher/deleteStudent/'+roll,{headers:{Authorization: `Bearer ${token}`}}).then(function(response){
        res.redirect("/teacher/view-student")
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.login=(req,res)=>{
    res.clearCookie("teacherToken");
   
    res.render('teacher/login');
}
exports.register=(req,res)=>{
    res.render('teacher/register');
}
