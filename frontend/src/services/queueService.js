import axios from "axios";

const API = "http://localhost:5000/api/queue";

// get all queues
export const getQueues =async () => {
    const response= await axios.get(API);
    return response.data;
};

// create queue
export const createQueue  = async (queueData) => {
    const response = await axios.post(
        `${API}/create`,
        queueData
    );

    return response.data;
};


// call next token
export const callNextToken = async (queueId) => {
    const response =await axios.put(
        `${API}/next`,
        {queueId}
    );

    return response.data;
};