    import { useEffect,useState } from "react";

    import socket from "../socket/frontendSocket";

    import { getQueues } from "../services/queueService";
    import {joinQueue} from "../services/customerQueueService";

    import { useParams } from "react-router-dom";
    


    function CustomerQueue() {

        const {queueId} = useParams();
        
        const [queue,setQueue] = useState(null);

        const [joinedData,setJoinedData] = useState(null);

        // fetch queues
        const fetchQueue = async () => {
            try{
                const data=await getQueues();

                const selectedQueue = data.find((q) => q._id === queueId);

                setQueue(selectedQueue);
            
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

            fetchQueue();

            socket.emit("joinedQueueRoom",queueId);

            socket.on("queueUpdated",() => {
                fetchQueue();
            });

            return ()=>{
                socket.off("queueUpdated");
            };
        }, []);
      

        const livePeopleAhead = queue &&  joinedData ? joinedData.position -
        queue.currentServingToken-1 
        :0;
        
        const liveEstimatedWait = queue && joinedData
        ? livePeopleAhead *
        queue.averageServiceTime
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
            
        
        {queue &&(
            <div>

                <h3>{queue.name}</h3>

                <p>
                    Current Serving: {queue.currentServingToken}
                </p>

                <p>
                    Current Token: {queue.currentToken}
                </p>

                <button onClick={() => handleJoinQueue(queueId)}>
                    Join Queue
                </button>

                <hr/>
                
            </div>

        )}
        </div>
    )
    }
    
    export default CustomerQueue;