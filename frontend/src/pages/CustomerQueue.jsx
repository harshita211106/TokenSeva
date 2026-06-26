    import { useEffect,useState } from "react";

    import socket from "../socket/frontendSocket";

    import { getQueues } from "../services/queueService";
    import {joinQueue} from "../services/customerQueueService";

    import { useParams } from "react-router-dom";
    


    function CustomerQueue() {

        const {queueId} = useParams();
        
        const [queue,setQueue] = useState(null);

        const [joinedData,setJoinedData] = useState(null);

        const [joining, setJoining] = useState(false);

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
                setJoining(true);
                const data= await joinQueue(queueId);

                setJoinedData({
                    ...data,
                    queueId,
                });
            }
            catch(error){
                console.log(error);

            }
            finally {
                setJoining(false);
            }
        };

        useEffect(()=>{

            fetchQueue();

            socket.emit("joinQueueRoom",queueId);

            socket.on("queueUpdated",() => {
                fetchQueue();
            });

            return ()=>{
                socket.off("queueUpdated");
            };
        }, []);
      

        const livePeopleAhead = queue &&  joinedData 
    ? Math.max(
        joinedData.position -
        queue.currentServingToken - 1,
        0
      )
    : 0;
        
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
                    {livePeopleAhead === 0 && (
                    <p className="text-green-600 font-bold text-xl mt-4 text-center">
                        It's Your Turn!
                    </p>
                    )}

                    </div>
                    

                    </>

                        )}
                </div>
            
        <div className="bg-white rounded-2xl shadow-md p-6">
        
        {!queue && (
  <div className="bg-white p-6 rounded-xl text-center shadow-md">
    <div className="bg-white p-8 rounded-2xl text-center shadow-md">

        <h2 className="text-2xl font-bold mb-2">
            Queue Not Found
         </h2>

        <p className="text-gray-600">
             Please scan a valid QR code.
         </p>

</div>
  </div>
        )}

        {queue &&(
            <div>

                <h3 className="text-2xl font-semibold mb-4">{queue.name}</h3>

                <p className="text-lg text-green-700 font-medium mb-2">
                    Current Serving: A{100 + queue.currentServingToken}
                </p>

                <p className="text-gray-700 mb-4">
                    Current Token: A{100 + queue.currentToken}
                </p>

                <button className={`w-full py-3 rounded-xl font-medium text-white transition
                    ${
                    joining
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                disabled={joining}
                 onClick={() => handleJoinQueue(queueId)}>
                    {joining ? "Joining..." : "Join Queue"}
                </button>

                </div>

            )}
            </div>
        </div>
    <p className="text-center text-sm text-gray-500 mt-8">
       TokenSeva: Real-time Queue Management System
    </p>
           
    </div>
        
    )
    }
    
    export default CustomerQueue;