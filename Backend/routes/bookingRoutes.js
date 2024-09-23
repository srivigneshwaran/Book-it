const express = require('express')
const router = express.Router()

const {GetBookings , bookHall , EditBooking ,DeleteBooking , PendingBookings , Decision,GetBookings_Approved , GetBookings_of_User,} = require('../controller/bookingController')

// authorization midlleware 
const {protect} = require('../middleware/authMiddleware')  

//conflict middleware
const { checkForConflicts } = require('../middleware/conflictMiddleware')

// admin midlleware 
const { adminProtect } = require('../middleware/adminMiddleware')



router.route('/').get(protect,GetBookings ).post(protect , checkForConflicts ,bookHall )

router.route('/:id').put(protect , checkForConflicts ,EditBooking ).delete(protect ,DeleteBooking )

router.route('/approved').get(protect,GetBookings_Approved )

router.route('/mybookings').get(protect,GetBookings_of_User )

// admin dashboard URIs

router.route('/pending').get(protect,adminProtect,PendingBookings )

router.route('/pending/:id').patch(protect,adminProtect, Decision)


module.exports = router