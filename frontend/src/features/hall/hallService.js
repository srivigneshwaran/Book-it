import axios from "axios";

const API_URI = '/api/hall/'

const getHalls = async(token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URI , config)

    return response.data
}


const createHalls = async(token , hallData) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URI ,hallData, config)

    return response.data
}

const updateHalls = async( hallId , hallData ,token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.put(API_URI + hallId ,hallData, config)
    return response.data
}



const deleteHalls = async(token , hallId) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URI + hallId , config)
    return response.data
}




const hallService ={
    getHalls,
    createHalls,
    updateHalls,
    deleteHalls
}

export default hallService