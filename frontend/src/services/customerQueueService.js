import axios from "axios";

const API ="http://localhost:5000/api/queue"

export const joinQueue = async (queueId)=>{

    const response = await axios.post(
        `${API}/join`,
        {queueId}
    );
    return response.data;
}
