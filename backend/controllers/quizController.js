const Quiz = require('../models/quizModel');
const ErrorResponse = require('../utils/errorResponse');

exports.createQuiz = async(req, res, next)=>{

    try{
        //upload image in cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: "posts",
            width: 1200,
            crop: "scale"
        })

        const quiz = await Quiz.create(
            {image: {
                public_id: result.public_id,
                url: result.secure_url
            }}, req.body)

        res.status(201).json({
            success: true,
            quiz
        })
    }catch(error){
        next(new ErrorResponse('The creation of this quiz failed', 401))
    }
}