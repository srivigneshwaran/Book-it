import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventService from './eventService';

const initialState = {
  approvedBookings: [],
  loading: false,
  error: null,
};

// Get Approved Bookings

export const fetchApprovedBookings = createAsyncThunk(
  'booking/fetchApprovedBookings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.getApproved(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovedBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApprovedBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedBookings = action.payload;
      })
      .addCase(fetchApprovedBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;