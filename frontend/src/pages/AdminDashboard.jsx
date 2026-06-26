import {  useEffect, useState } from "react";
import {
    getQueues,
    createQueue,
    callNextToken,
} from "../services/queueService";

import socket from "../socket/frontendSocket"

import QRCode from "react-qr-code";


function AdminDashboard() {

    const [queues,setQueues] = useState([]);

    const [name,setName] = useState("");

    const [averageServiceTime,setAverageServiceTime] =  useState("");

    const [loading,setLoading] = useState(false);

    // fetch queues
    const fetchQueues = async () =>{
        try{
            const data= await getQueues();
            setQueues(data);

        }
        catch(error){
            console.log(error);

        }
    };

    // create queue
    const handleCreateQueue = async () => {
        if (!name || !averageServiceTime) {
            return alert("Please fill all fields");
            }
        try{
            setLoading(true);
            await createQueue({
                name,
                averageServiceTime: Number(averageServiceTime),
            });
           await fetchQueues();

            setName("");
            setAverageServiceTime("");

        }catch(error){
            console.log(error);
        }
        
        finally {
          setLoading(false);
    }
};


    // call next token
    const handleNext= async (queueId) => {
        try{
            await callNextToken(queueId);

            await fetchQueues();

        }
        catch(error){
            console.log(error);

        }
        
    }

    useEffect(()=>{
        fetchQueues();
        socket.on("queueUpdated",()=>{
            fetchQueues();
        });

        return () => {
            socket.off("queueUpdated");
        };

    },[]);

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input className="border border-gray-300 p-3 rounded-lg w-full bg-white"
            type="text"
            placeholder="Queue Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <input className="border border-gray-300 p-3 rounded-lg w-full bg-white"
            type="number"
            placeholder="Average Service Time"
            value={averageServiceTime}
            onChange={(e)=>setAverageServiceTime(e.target.value)}
            />
            </div>

            <button className={`px-6 py-3 rounded-lg font-medium text-white transition
            ${
                loading
                ?"bg-gray-400 cursor-not-allowed"
                :"bg-blue-600 hover:bg-blue-700"
            }`}
            
             onClick={handleCreateQueue}
             disabled={loading}>
                {loading ? "creating..." : "Create Queue"}
            </button>

            
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {queues.map( (queue) => {
                const queueEmpty = queue.currentServingToken >= queue.currentToken;
                return(

                <div key={queue._id}
                className="bg-white rounded-xl shadow-md p-6"
                >
                    <h3 className="text-2xl font-semibold mb-4">{queue.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 text-center">Scan to Join Queue</p>
                   <div className="mt-6 flex justify-center"> 
                    <QRCode value={`http://localhost:5173/queue/${queue._id}`}/>
                    </div>
                <div className="space-y-2 mb-4">
                    <p className="text-gray-700">
                        Current Token: {queue.currentToken}
                    </p>

                    <p className="text-gray-700">
                        Serving: {queue.currentServingToken}
                    </p>
                </div>

                    <button className={`mt-2 px-5 py-2 rounded-lg text-white transition
                        ${
                            queueEmpty
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                     onClick={()=>handleNext(queue._id)}
                     disabled={queueEmpty}
                    >
                        {queueEmpty
                            ? "Queue Empty"
                            : "Next Token"}
                    
                    </button>

                    
                </div>
                )
            }
            )}
            </div>
            </div>
        </div>
    );
}

export default AdminDashboard;