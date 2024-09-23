import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookService from './bookService';

export const makeBooking = createAsyncThunk('book/makeBooking',async (bookingData, thunkAPI) => { 
    try {
      const token = thunkAPI.getState().auth.user.token; //getting token
      return await bookService.makeBooking(token, bookingData)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);

const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(makeBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { clearMessage } = bookSlice.actions;
export default bookSlice.reducer;