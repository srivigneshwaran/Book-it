import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import hallService from "./hallService";


// get Halls
export const getHalls = createAsyncThunk('booking/getHalls' , async(_,thunkAPI) =>{
    try { 
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await hallService .getHalls(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// create Halls
export const createHalls = createAsyncThunk('booking/createHalls' , async(hallData,thunkAPI) =>{
    try { 
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await hallService .createHalls(token , hallData)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// update Halls
export const updateHalls = createAsyncThunk('booking/updateHalls' , async({hallId,hallData},thunkAPI) =>{
    try { 
        console.log(hallData)
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await hallService .updateHalls( hallId , hallData , token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// delete Halls
export const deleteHalls = createAsyncThunk('booking/deleteHalls' , async(hallId,thunkAPI) =>{
    try { 
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await hallService .deleteHalls(token , hallId)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})







const initialState = {
    halls:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:''
}

const hallSlice = createSlice({
    name:'halls',
    initialState,
    reducers:{
        reset:(state)=>{
         state.isLoading =false,
         state.isSuccess = false,
         state.isError =false,
         state.message =''
        }
    },
    extraReducers:(builder) => { 
        builder
         // Get halls
         .addCase(getHalls.pending , (state,action) =>{
            state.isLoading = true
        })
        .addCase(getHalls.rejected , (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getHalls.fulfilled , (state,action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.halls = action.payload
        })

        // create Halls
        .addCase(createHalls.pending , (state,action) =>{
            state.isLoading = true
        })
        .addCase(createHalls.rejected , (state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createHalls.fulfilled , (state,action) =>{
            state.isLoading = false
            state.isSuccess= true
            state.halls.push(action.payload)
        })


        //delete halls
        .addCase(deleteHalls.pending , (state , action) =>{
            state.isLoading = true
        })
        .addCase(deleteHalls.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.halls =  state.halls.filter((hall) => hall._id !== action.payload.id)
        })
        .addCase(deleteHalls.rejected , (state , action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })


        //update Halls
        .addCase(updateHalls.pending , (state , action) =>{
            state.isLoading = true
        })
        .addCase(updateHalls.fulfilled , (state , action) =>{
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(updateHalls.rejected , (state , action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

    }
    }

)

export const {reset} = hallSlice.actions
export default hallSlice.reducer