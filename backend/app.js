const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');

//configuration of socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const errorHandler = require('./middleware/error');

//import routes
const authRoutes = require('./routes/authRoutes');

//database connexion
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology : true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
app.use('/api', authRoutes);

//error middleware
app.use(errorHandler);

//port 
const port = process.env.PORT || 8000

io.on('connection', (socket)=>{
    console.log('a user is connected', socket.id);
})

exports.io = io;

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})