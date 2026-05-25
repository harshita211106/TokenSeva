
const express=require("express");
const app=express();

require("dotenv").config();   

app.get("/",(req,res)=>{
    res.send("Server is running" 
)});

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})