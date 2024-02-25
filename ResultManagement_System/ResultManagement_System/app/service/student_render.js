const axios = require('axios');
const cookie=require('cookie');
exports.login=(req,res)=>{
    res.clearCookie("studentToken");
   
   res.render('student/login')
}
exports.logout=(req,res)=>{
    
    res.redirect("/student/login");
}
exports.viewStudent=(req,res)=>{
     const roll=req.params.roll_no;
    
    axios.get('http://localhost:5001/result/'+roll).then(function(response){
        res.render('student/viewResult', { alldata : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
    
}
exports.home=(req,res)=>{
    res.render('home');
}
exports.postlogin=(req,res)=>{
    const roll=req.body.roll_no;
   
    axios.post('http://localhost:5001/login',req.body).then(function(response){
        
        res.cookie("studentToken",response.data);
       
        
            res.redirect("/student/"+roll);
       
    })
    .catch(err =>{
        res.render('student/login')
    })


}