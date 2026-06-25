let io;

const initSocket= (server)=>{
    const {Server, Socket} = require("socket.io");

    io=new Server(server,{
        cors:{
            origin:"*",
        },
    });

    io.on("connection",(socket)=>{
        console.log("socket connected:",socket.id);

        socket.on("joinQueueRoom",(queueId) => {
            socket.join(queueId);
            console.log(`Socket joined room: ${queueId}`);
        });

        socket.on("disconnect",()=>{
            console.log("socket disconnected");
        });
    });
}

const getIO = () => {
    if (!io){
        throw new Error("socket.io not initialized");
    }

    return io;
};

module.exports={initSocket,getIO,};





