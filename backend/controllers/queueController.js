const Queue=require("../models/queue")
const {getIO}=require("../sockets/socket");

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
        const {queueId}=req.body;

        const queue=await Queue.findById(queueId);

        if(!queue){
            return res.status(404).json({message: "Queue not found!"});
        }

        // generating next token
        queue.currentToken+=1;

        const token=`A${100+queue.currentToken}`;

        const peopleAhead = queue.currentToken-queue.currentServingToken-1;
        // waiting time calculation
        const estimatedWaitTime=queue.averageserviceTime * peopleAhead;

        await queue.save();

        res.status(200).json({
            message:"Queue joined successfully!",
            token:token,
            currentposition:queue.currentToken,
            estimatedWaitTime,
            peopleAhead

        });

    }
    catch(error){
        res.status(500).json({ message: error.message});

    }
}

// calling next token
const callNextToken = async(req,res)=>{
    try{
        const {queueId} = req.body;
        const queue=await Queue.findById(queueId);

        if(!queue){
            return res.status(404).json({
                message:"Queue not found",
            });
        }

        // if no more customers left
        if(queue.currentServingToken >= queue.currentToken){
            return res.status(400).json({
                message:"No customers in queue",
            });
        }
        
        queue.currentServingToken+=1;

        await queue.save();

        const io=getIO();

        io.emit("queueUpdated",{
            queueId:queue._id,
            currentServingToken:queue.currentServingToken,
            currentToken:queue.currentToken,
        });

        res.status(200).json({
            message:"Next token called",
            servingToken: `A${100+queue.currentServingToken}`,
        });

    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports={createQueue,getQueue,joinQueue,callNextToken};