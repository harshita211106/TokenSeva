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
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-8 text-center">
                    Customer Queue</h1>

                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

                     {joinedData && (
                         
                    <>

                    <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
                        Your Token: {joinedData.token}
                    </h2>

                    <div className="space-y-3 text-gray-700">
                        
                    <p className="text-lg">
                        Position: {joinedData.position}
                    </p>

                    <p className="text-lg">
                        People Ahead: {livePeopleAhead}
                    </p>

                    <p className="text-lg font-semibold text-orange-500">
                        Estimated Wait: {liveEstimatedWait} mins
                    </p>

                    </div>
                    

                    </>

                        )}
                </div>
            
        <div className="bg-white rounded-2xl shadow-md p-6">
        
        {!queue && (
  <div className="bg-white p-6 rounded-xl text-center shadow-md">
    Queue not found
  </div>
        )}

        {queue &&(
            <div>

                <h3 className="text-2xl font-semibold mb-4">{queue.name}</h3>

                <p className="text-lg text-green-700 font-medium mb-2">
                    Current Serving: {queue.currentServingToken}
                </p>

                <p className="text-gray-700 mb-4">
                    Current Token: {queue.currentToken}
                </p>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                 onClick={() => handleJoinQueue(queueId)}>
                    Join Queue
                </button>

                
                
            </div>

            )}
        </div>
           </div>
        </div>
    )
    }
    
    export default CustomerQueue;