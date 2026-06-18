    import { useEffect,useState } from "react";

    import socket from "../socket/frontendSocket";

    import { getQueues } from "../services/queueService";
    import {joinQueue} from "../services/customerQueueService";


    function CustomerQueue() {
        
        const [queues,setQueues] = useState([]);

        const [joinedData,setJoinedData] = useState(null);

        // fetch queues
        const fetchQueues = async () => {
            try{
                const data=await getQueues();
                setQueues(data);

            }
            catch(error){
                console.log(error);

            }
        };


        // join queue
        const handleJoinQueue = async (queueId) => {
            try{
                const data= await joinQueue(queueId);

                setJoinedData({
                    ...data,
                    queueId,
                });
            }
            catch(error){
                console.log(error);

            }
        };

        useEffect(()=>{

            fetchQueues();

            socket.on("queueUpdated",() => {
                fetchQueues();
            });

            return ()=>{
                socket.off("queueUpdated");
            };
        }, []);
        const joinedQueue = queues.find(
            (queue) => queue._id === joinedData?.queueId
        );

        const livePeopleAhead = joinedQueue? joinedData.position -
        joinedQueue.currentServingToken-1 
        :0;
        
        const liveEstimatedWait = joinedQueue
        ? livePeopleAhead *
        joinedQueue.averageServiceTime
        : 0;

        return (
            <div>
                <h1>Customer Queue</h1>

    {joinedData && (

                <>

                    <h2>
                        Your Token: {joinedData.token}
                    </h2>

                    <p>
                        Position: {joinedData.position}
                    </p>

                    <p>
                        People Ahead: {livePeopleAhead}
                    </p>

                    <p>
                        Estimated Wait: {liveEstimatedWait} mins
                    </p>

                    <hr />

                </>

            )}
            
        
        {queues.map((queue)=>(
            <div key={queue._id}>

                <h3>{queue.name}</h3>

                <p>
                    Current Serving: {queue.currentServingToken}
                </p>

                <p>
                    Current Token: {queue.currentToken}
                </p>

                <button onClick={() => handleJoinQueue(queue._id)}>
                    Join Queue
                </button>

                <hr/>
                
            </div>

        ))}
        </div>
    )
    }
    
    export default CustomerQueue;