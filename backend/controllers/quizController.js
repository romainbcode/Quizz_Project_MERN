const Quiz = require('../models/quizModel');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../utils/cloudinary')

exports.createQuiz = async(req, res, next)=>{
    const {image} = req.body;
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

//delete Quiz by id
exports.deleteQuiz = async(req, res, next)=>{
    //Firstly, deleting the image
    const currentQuiz = await Quiz.findById(req.params.id);
    const ImgId = currentQuiz.image.public_id;

    if(ImgId){
        await cloudinary.uploader.destroy(ImgId);
    }

    try{
        //Secondly, deleting quiz from mongoDB
        const quiz = await Quiz.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Post deleted"
        })
    }catch(err){
        next(err);
    }
}


//update Quiz by id
exports.updateQuiz = async(req, res, next)=>{
    try{
        const {title, subheader, image, questionAnswer} = req.body

        const currentQuiz = await Quiz.findById(req.params.id);

        const data = {
            title: title || currentQuiz.title,
            subheader: subheader || currentQuiz.subheader,
            image: image || currentQuiz.image,
            questionAnswer : questionAnswer || currentQuiz.questionAnswer
        }

        //modify quiz image conditionnaly
        if(req.body.image !== ''){
            const ImgId= currentQuiz.image.public_id;
            if(ImgId){
                await cloudinary.uploader.destroy(ImgId);
            }
            const newImage = await cloudinary.uploader.upload(req.body.image, {
                folder: 'quizs',
                width: 1200,
                crop: 'scale'
            });

            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            };
        }

        const quizUpdate =  await Quiz.findByIdAndUpdate(req.params.id, data, {new:true});
        res.status(200).json({
            success: true,
            quizUpdate
        })

    }catch(error){
        next(err);
    }
}

//add score quiz
exports.addScoreQuiz = async (req, res, next) => {
    const {correctAnswer, totalCorrectAnswer} = req.body
    
    try {
        const quizScore = await Quiz.findByIdAndUpdate(req.params.id, {
            $push: { scores: { 
                completedBy: req.user._id,
                correctAnswer: correctAnswer,
                totalCorrectAnswer: totalCorrectAnswer
              } }
            },
            { new: true }
        );

        const quiz = await Quiz.findById(quizScore._id).populate('scores.completedBy', 'username email')//Ajoute les données name et email dans postedBy alors que normalement y'a que l'id car les deux tables sont liées par postedBy
        res.status(200).json({
            success: true,
            quiz
        })

    } catch (error) {
        next(error);
    }

}