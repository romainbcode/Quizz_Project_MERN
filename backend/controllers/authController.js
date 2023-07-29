const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

exports.signup = async(req, res, next)=>{
    const {email} = req.body;
    const {username} = req.body;
    const userExist = await User.findOne({email});
    const usernameExist = await User.findOne({username})

    if(userExist){
        return next(new ErrorResponse('Email already registred'), 400);
    }
    if(usernameExist){
        return next(new ErrorResponse('Username already registred'), 400);
    }

    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        next(error)
    }
}