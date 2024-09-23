import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import bookingService from './myBookingsService';

const initialState = {
  userBookings: [],
  loading: false,
  error: null,
};

export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.user.token;

    try {
      const response = await bookingService.getUserBookings(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePendingBooking = createAsyncThunk(
  'booking/deletePendingBooking',
  async (bookingId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.user.token;

    try {
      await bookingService.deleteBooking(token, bookingId);
      return bookingId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userBooking = createSlice({
  name: 'userBooking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      
      .addCase(deletePendingBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePendingBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = state.userBookings.filter((booking) => booking._id !== action.payload);
        toast.success('Pending bookings deleted');
      })
      .addCase(deletePendingBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Error deleting booking');
      });
  },
});

export default userBooking.reducer;