const asyncHandler = require("express-async-handler")
const Admin = require('../model/Admin');
var bcrypt = require('bcryptjs')
const AHTdata = require('../model/AdminPermission')
const Teacher = require('../model/teacher');
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.Registeradmin = asyncHandler(async (req, res) => {

    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: "All the Fields are Mandatory" })

    }
    const admin = await Admin.findOne({
        where: {
            email: email

        }
    });
    if (admin) {
        return res.status(400).json({ message: "Admin Already Exist" })
      }
    else {
       
      await Admin.create({
            email:email,
            name:name,
            password:bcrypt.hashSync(password,8),
           
        })
        return res.redirect('/admin/login')
    }

});
exports.viewAdmin = asyncHandler(async (req, res) => {
    const data = await AHTdata.findAll();
    return res.render('adminViewTeacher', {
        alldata: data
    });
})
exports.loginadmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All the Fields are Mandatory" })

    }

    const admin = await Admin.findOne({
        where: {
            email: email

        }
    });
    if (admin && (bcrypt.compareSync(password, admin.password))) {

        const adminToken = jwt.sign({

            email: email,
            id: admin.id,
        }, process.env.ACCESS_TOKEN_SECERT, {
            expiresIn: "60m",
        })

        res.cookie("adminToken", adminToken);


        return res.redirect('/admin/view')


    }
    else {

        res.render('admin')
    }

});
exports.teacherData = asyncHandler(async (req, res) => {
    const { name, email, password, action } = req.body;

    if (action === 'accept') {
        const teacher = await Teacher.create({

            name: name,
            email: email,
            password: password,

        })
    }
    await AHTdata.destroy({
        where: { email: email }
    });
    return res.redirect('/admin/view');
}
)

