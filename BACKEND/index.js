require('dotenv').config()
const express=require('express')
const path=require('path')
const {logger}=require('./middleware/logger')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')
const cors=require('cors')
const errHandler=require('./middleware/errhandler')
const app=express()
const http=require('http')
const corsOptions=require('./config/corsOptions')
app.use(logger)
app.use(express.json())
app.use(cors(corsOptions))
const {Server}=require('socket.io')
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET",'POST']
    }
})

io.on('connection',(socket)=>{
    console.log(`User ${socket.id} connected`)  
    //when broadcasting to one room
    socket.on('send_message',(data)=>{
        socket.broadcast.emit('receive_message',data)
    })
    //when broadcasting on different rooms
    /* socket.on('send_message',(data)=>{
        socket.to(data.room).emit('receive_message',data)
    }) 
    socket.on('join_room', (data)=>{
        socket.join(data)
    }) */


})

app.use(cookieParser())
// ROUTES
app.use('/img', express.static(path.join(__dirname,'img')));
app.use('/items',require('./routes/itemRoutes'))
app.use('/users',require('./routes/buyerRoutes'))
app.use('/signup',require('./routes/signupRoute'))
app.use('/buy',require('./routes/buyItem'))
app.use('/work',require('./routes/employeeRoutes'))
app.use('/auth',require('./routes/authRoutes'))
app.use('/mess',require('./routes/messRoutes'))
app.all('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'))
})







mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database connected successfully!")
})
.catch(error=>console.log(error))

app.use(errHandler)


server.listen(process.env.PORT,()=>{
    console.log(`Server is functional and running on port ${process.env.PORT}`)
    
})

