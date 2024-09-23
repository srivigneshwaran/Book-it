const asyncHandler = require('express-async-handler');
const Booking = require('../model/bookingModel');

const checkForConflicts = asyncHandler(async (req, res, next) => {
  const { hallId, startTime, endTime } = req.body;

  // Find bookings that overlap with the new booking, excluding the booking being edited
  const overlappingBookings = await Booking.find({
    hallId: hallId,
    status:{$ne: 'rejected' },
    status:{$ne: 'finished' },
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } }
    ]
  });

  // Check if any overlapping bookings were found
  if (overlappingBookings.length > 0) {
    res.status(409);
    throw new Error('Slot taken so try a differnt slot !');
  }
  else{
    next();
  } 

  
});

module.exports = { checkForConflicts };