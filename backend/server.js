
const express=require("express");
const dotenv=require("dotenv");
const http=require("http");
const cors = require("cors");


const {initSocket}=require("./sockets/socket");

const connectDB=require("./config/db")

// import route
const queueRoute=require("./routes/queueRoutes");

dotenv.config();

// connect DB
connectDB();
const app=express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// use route
app.use("/api/queue",queueRoute);

app.get("/",(req,res)=>{
    res.send("Server is running" 
)});

// create http server
const server=http.createServer(app);

// inatilize socket server
initSocket(server);

const port=process.env.PORT;

server.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})