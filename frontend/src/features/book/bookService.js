import axios from 'axios';

const API_URI = '/api/booking';

const makeBooking = async (token, bookingData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  
    const response = await axios.post(API_URI, bookingData, config);
    return response.data;
    
  } catch (error) {
    throw error
  }
  
};

const bookService = {
  makeBooking
};

export default bookService;