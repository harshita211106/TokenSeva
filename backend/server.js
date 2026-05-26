
const express=require("express");
const app=express();
require("dotenv").config();   
const connectDB=require("./config/db")

app.use(express.json());

// import route
const testRoute=require("./routes/testRoute");
const queueRoute=require("./routes/queueRoutes");



// use route
app.use("/api/test",testRoute);
app.use("/api/queue",queueRoute);

// connect DB
connectDB();


app.get("/",(req,res)=>{
    res.send("Server is running" 
)});

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port: http://localhost:${port}`);
})