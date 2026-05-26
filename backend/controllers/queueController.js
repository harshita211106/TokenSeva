const Queue=require("../models/queue")

// create queue controller
const createQueue= async (req,res)=>{
    try{
        const {name,averageServiceTime}=req.body;
        
        const newQueue=await Queue.create({
            name,
            averageServiceTime,
        });

        res.status(201).json(newQueue);
    }
    
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}


// get/fetch queue controller
const getQueue=async (req,res)=>{
    try{
        const queues=await Queue.find();

        res.status(200).json(queues);
    } 
    
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports={createQueue,getQueue,};