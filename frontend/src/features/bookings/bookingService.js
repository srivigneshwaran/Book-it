import axios from 'axios'

const API_URI = '/api/booking/'

// get pending Bookings
const getPending = async(token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URI + 'pending' , config)

    return response.data

}


// Admin Response
const adminResponse = async(BookingID,Decision,token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }

    const response = await axios.patch(API_URI + 'pending/'+ BookingID , { status: Decision } ,config)

    return response.data
}

 const bookingsService ={
    getPending,
    adminResponse
}

export default bookingsService