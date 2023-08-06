const Quiz = require('../models/quizModel');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary')

exports.createQuiz = async(req, res, next)=>{
    console.log("okok")
    const {image} = req.body;
    console.log(req.body)
    try{
        //upload image in cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "quizs",
            width: 1200,
            crop: "scale"
        })

        const quiz = await Quiz.create({
            
            
            title : req.body.title,
            subheader: req.body.subheader,
            //postedBy: req.user._id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            questionAnswer: req.body.questionAnswer,
            //scores: ["64c552533dfbf19cc42972a8"],
            //likes: ["64c552533dfbf19cc42972a8"]

        })

        res.status(201).json({
            success: true,
            quiz
        })
    }catch(error){
        next(new ErrorResponse('The creation of this quiz failed', 401))
    }
}

//Show all quizs
exports.showQuizs = async(req, res, next)=>{
    try{
        const quizs = await Quiz.find().sort({createdAt : -1}).populate('postedBy', 'username')
        res.status(201).json({
            success: true,
            quizs
        })
    }catch(error){
        next(error)
    }
}

//show single quiz by id
exports.showSingleQuiz = async(req, res, next)=>{
    try{
        const quiz = await Quiz.findById(req.params.id).populate('postedBy', 'username')
        res.status(200).json({
            success: true,
            quiz
        })
    }catch(err){
        next(err);
    }
}