const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required:[true, "Please add a username"],
        unique: true,
        minlength: [5, "Username need minimum of 5 caracters"],
        maxlength: [15, "Username need maximum of 15 caracters"]
    },
    email:{
        type: String,
        trim: true,
        required: [true, "Please add an email"],
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password:{
        type: String,
        trim: true,
        required: [true, "Please add a Password"],
        minlength : [6, "Password must have more than 6 characters"],
        match:[
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
           'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
        ]
    },
    role: {
        type: String,
        default: 'user'
    },
    scores:[{ 
        type: String,
        ref: "Quiz"
    }]
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password)
}

//Token for staying connected during 3 hours
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id},
    process.env.JWT_SECRET, {
        expiresIn: 10800
    })
}

module.exports = mongoose.model('User', userSchema)