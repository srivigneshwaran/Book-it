const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    amenities: {
        type: String,
        enum: ['a/c', 'non-a/c'],
        default: 'non-a/c',
    },
    capacity: {
        type: Number,
        required: [true, 'Please add a capacity'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    contactNumber: {
        type: String,
        required: [true, 'Please add Phone number'],
    },
    inChargePerson: {
        type: String,
        required: [true, 'Please add a Incharge person'],
    },
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Hall', hallSchema);
