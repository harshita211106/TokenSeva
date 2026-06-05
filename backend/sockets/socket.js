let io;

const initSocket= (server)=>{
    const {Server} = require("socket.io");

    io=new Server(server,{
        cors:{
            origin:"*",
        },
    });

    io.on("connection",(socket)=>{
        console.log("socket connected:",socket.id);

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





