const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema; 

const quizSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        unique: true,
        required: [true, "You must add a title"]
    },
    subheader: {
        type: String,
        maxlength: [75, "Subheader needs a maximum of 75 characters"],
        required: [true, "You must add a subheader"]
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    image: {
        url: String,
        public_id: String,
    },
    questionAnswer: {
        question: {
            type: String,
            required: [true, "You must add a question"]
        },
        created: { type: Date, default: Date.now },
        answer: [{
            answerText: { 
                type: String,
            },
            stateAnswer: {
                type: Boolean
            }
        }],
        postedBy: {
            type: ObjectId,
            ref: "User"
        }
    },
    scores: [{ type: ObjectId, ref: "User" }],
    likes: [{ type: ObjectId, ref: "User" }],
}, {timestamps: true})

module.exports = mongoose.model('Quiz', quizSchema)