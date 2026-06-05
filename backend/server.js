
const express=require("express");
const dotenv=require("dotenv");
const http=require("http");

const {Server} = require("socket.io");

const connectDB=require("./config/db")

// import route
const queueRoute=require("./routes/queueRoutes");

dotenv.config();

// connect DB
connectDB();
const app=express();

app.use(express.json());

// use route
app.use("/api/queue",queueRoute);

app.get("/",(req,res)=>{
    res.send("Server is running" 
)});

// create http server
const server=http.createServer(app);

// socket server
const io=new Server(server,{
    cors: {
        origin: "*",
    },
});

// socket connection
io.on("connection",(socket)=>{
    console.log("User connected:",socket.id);

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    });
});

const port=process.env.PORT;

server.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})