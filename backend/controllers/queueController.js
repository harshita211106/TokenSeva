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


// user join the queue controller
const joinQueue=async (req,res)=>{
    try{
        const {queueID}=req.body;

        const queue=await Queue.findById(queueID);

        if(!queue){
            return res.status(404).json({message: "Queue not found!"});
        }

        // generating next token
        console.log(queue.currentToken);
        queue.currentToken+=1;

        const token=`A${100+queue.currentToken}`;

        await queue.save();

        res.status(200).json({
            message:"Queue joined successfully!",
            token:token,
            currentposition:queue.currentToken
        });
        console.log(queue.currentToken);

    }
    catch(error){
        res.status(500).json({ message: error.message});

    }
}

module.exports={createQueue,getQueue,joinQueue,};