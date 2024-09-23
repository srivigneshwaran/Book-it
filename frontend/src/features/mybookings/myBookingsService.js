import axios from "axios";

const API_URI = "/api/booking/";

const bookingService = {
  getUserBookings: async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URI + "mybookings", config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user bookings.");
    }
  },
  deleteBooking : async (token, id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(API_URI + `${id}`, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete booking.");
    }
  }
};

export default bookingService;