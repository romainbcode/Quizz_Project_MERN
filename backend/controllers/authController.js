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

const sendTokenResponse = async(user, codeStatus, res)=>{
    const token = await user.getJwtToken();
    res
    .status(codeStatus)
    .cookie('token', token, {maxAge: 3*60*60*1000, httpOnly: true})
    .json({
        success: true,
        id: user._id,
        role: user.role
    })

}
exports.signin = async(req, res, next)=>{
    try{
        const {email, password} = req.body;

        if(!email){
            return next(new ErrorResponse('Please add an email', 403));
        }
        if(!password){
            return next(new ErrorResponse('Please add a password', 403));
        }

        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("This email is not used", 400))
        }

        const isMatched = await user.comparePassword(password)
        if(!isMatched){
            return next(new ErrorResponse("Password wrong", 400));
        }

        //sendTokenResponse(user, 200, res);


    }catch(error){
        next(error)
    }
}