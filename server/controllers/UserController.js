const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const {comparePassword} = require("../helpers/inputHelpers");
const { sendJwtToClient } = require('../helpers/tokenHelpers');

const register = asyncHandler(async(req,res)=>{
    const user = await UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    res.status(200).json({
        message:"New User Created Succesfully",
        id: user._id
    });
});

const login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email}).select("+password");
    if(!user) {
        return res.status(400).json({
            message: "User Not Found"
        })
    }
    
    if(!comparePassword(password,user.password)) {
        return res.status(400).json({
            message: "Password Error"
        })
    }

    sendJwtToClient(user, res);
});

const logout = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:""
    });
});

module.exports = {
    login,logout,register
}