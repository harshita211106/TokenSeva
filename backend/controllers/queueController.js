const Queue=require("../models/queue")

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

module.exports={createQueue,};