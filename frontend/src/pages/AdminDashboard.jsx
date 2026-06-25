import {  useEffect,useState } from "react";
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
            await createQueue({
                name,
                averageServiceTime: Number(averageServiceTime),
            });
            fetchQueues();

            setName("");
            setAverageServiceTime("");

        }catch(error){
            console.log(error);


        }
    };


    // call next token
    const handleNext= async (queueId) => {
        try{
            await callNextToken(queueId);

            fetchQueues();

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

            <div className="flex gap-4 mb-6">
            <input className="border p-3 rounded w-full"
            type="text"
            placeholder="Queue Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <input className="border p-3 rounded w-full"
            type="number"
            placeholder="Average Service Time"
            value={averageServiceTime}
            onChange={(e)=>setAverageServiceTime(e.target.value)}
            />
            </div>

            <button className="bg-blue-500 text-white px-5 rounded" onClick={handleCreateQueue}>
                Create Queue
            </button>

            <hr/>

            {queues.map( (queue) => (
                <div key={queue._id}>
                    <h3>{queue.name}</h3>

                    <QRCode value="{`http://localhost:5173/queue/${queue._id}`}"/>

                    <p>
                        Current Token: {queue.currentToken}
                    </p>

                    <p>
                        Serving: {queue.currentServingToken}
                    </p>

                    <button onClick={()=>handleNext(queue._id)}
                    >
                        Next Token
                    
                    </button>

                    <hr/>
                </div>
            ))}
            </div>
        </div>
    );
}

export default AdminDashboard;