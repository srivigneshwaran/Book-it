const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please provide a user ID'],
            ref: 'User'
            
        },
        hallId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please provide a hall ID'],
            ref: 'Hall'     
        },
        venue:{
            type:String,
            required: [true, 'Please provide a event venue'],
            
        },
        event:{
            type:String,
            required: [true, 'Please provide a event name'],
            
        },
        coordinator:{
            type:String,
            required: [true, 'Please provide a Manager coordinator'],
        },
        department:{
            type:String,
            required: [true, 'Please provide the Department'],
        },
        startTime: {
            type: Date,
            required: [true, 'Please provide a start time'],
        },
        endTime: {
            type: Date,
            required: [true, 'Please provide an end time'],
        },
        status: {
            type: String,
            enum: ['pending','approved','rejected','finished'],
            default: 'pending',
        },
    },

    {
        timestamps: true
    }

);


module.exports = mongoose.model('Booking', bookingSchema);
