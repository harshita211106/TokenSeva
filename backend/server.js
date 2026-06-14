
const express=require("express");
const dotenv=require("dotenv");
const http=require("http");

const {intisocket, initSocket}=require("./sockets/socket");

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

// inatilize socket server
initSocket(server);

const port=process.env.PORT;

server.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})