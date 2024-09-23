import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import bookingService from './bookingService'


//initial state
const initialState ={
    Bookings:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}


// get pending bookings
export const pendingBookings = createAsyncThunk('booking/pendingBookings' , async(_,thunkAPI) =>{
    try { 
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await bookingService .getPending(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// Admin response 
export const adminResponse = createAsyncThunk('booking/adminResponse' ,async({ BookingID, Decision } , thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token                       //getting token
        return await bookingService.adminResponse(BookingID ,Decision, token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers:{
        reset:(state) => {
                state.isLoading =false,
                state.isSuccess= false,
                state.isError =false,
                state.message =''
           
        }
    },
    extraReducers:(builder)=>{
        builder

        //Pending Bookings
        .addCase(pendingBookings.pending , (state,action) =>{
            state.isLoading = true
        })
        .addCase(pendingBookings.rejected , (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(pendingBookings.fulfilled , (state,action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.Bookings = action.payload
        })


        //Admin Decision
        .addCase(adminResponse.pending , (state,action) =>{
            state.isLoading = true
        })
        .addCase(adminResponse.rejected , (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(adminResponse.fulfilled , (state,action) =>{
            state.isLoading = false
            state.isSuccess= true
        })
    }
})


export const {reset} = bookingSlice.actions
export default bookingSlice.reducer