const schedule = require('node-schedule');
const Booking = require('../model/bookingModel');


//    0 */5 * * *       ---> for every five hours
const ScheduledJob = () =>{  return  schedule.scheduleJob('*/1 * * * *', async () => {
    try {
        console.log('Scheduled job running at:', new Date());

        const expiredBookings = await Booking.find({ endTime: { $lt: new Date() }, status: 'approved' });

        if (expiredBookings.length > 0) {
            console.log('Found expired bookings:', expiredBookings);

            await Booking.updateMany(
                { _id: { $in: expiredBookings.map(booking => booking._id) } },
                { $set: { status: 'finished' } }
            );

            console.log(`Updated ${expiredBookings.length} expired bookings.`);
        } else {
            console.log('No expired bookings found.');
        }
    } catch (error) {
        console.error('Error updating expired bookings:');
    }
});

}
module.exports = ScheduledJob