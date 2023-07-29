const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorResponse('You must log in....', 401));
    }
    try{
        //decode the token with our JWT password
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }catch(error){
        return next(new ErrorResponse('You must Log In', 401));
    }
}

exports.isAdmin = async(req, res, next)=>{
    if(req.user.role === "user"){
        return next(new ErrorResponse('Acces denied, you must be an admin', 401));
    }
    next();
}