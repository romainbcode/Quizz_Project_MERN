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
        text: {
            type: String,
            maxlength: [75, "Subheader needs a maximum of 75 characters"],
            required: [true, "You must add a subheader"]
        }
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    image: {
        url: String,
        public_id: String,
    },
    question: {
        text: String,
        created: { type: Date, default: Date.now },
        answer: [{
            text: String,
            goodAnswer: Boolean
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