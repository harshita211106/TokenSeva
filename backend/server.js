
const express=require("express");
const app=express();
require("dotenv").config();   
const connectDB=require("./config/db")

// import route
const testRoute=require("./routes/testRoute");



// use route
app.use("/api/test",testRoute);

// connect DB
connectDB();


app.get("/",(req,res)=>{
    res.send("Server is running" 
)});

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})