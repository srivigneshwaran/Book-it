import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {pendingBookings,adminResponse,reset} from '../features/bookings/bookingSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';

function AdminPanel() {

  const dispatch = useDispatch()

  const {Bookings , isLoading , isError , isSuccess , message} = useSelector((state) => state.booking)
  const {user} = useSelector((state)=> state.auth)
 
  useEffect(()=>{
    if (user && user.token && user.role === 'admin' && !isSuccess) {
      dispatch(pendingBookings())
      dispatch(reset()) 
    }
  },[])


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    
    // if (isSuccess) {
    //   dispatch(pendingBookings())
    //   toast.success('success')
    //   dispatch(reset()) 
    // }

    return () => {
      dispatch(reset());
    };
  }, [dispatch ,isSuccess, isError, Bookings, message]);

  // handle admin action
  const handleAction = (action , id) =>{
    const response = action
    dispatch(adminResponse({ BookingID: id, Decision: response }))
    .then(() => {
      dispatch(pendingBookings());
      dispatch(reset());
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
  }

  if (isLoading) return <Spinner />;

  return (
    <>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Hall</th>
            <th>Dept</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="6">Error: {message}</td>
            </tr>
          ) : Bookings.length > 0 ? (
            Bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.event}</td>
                <td>{booking.venue}</td>
                <td>{booking.department}</td>
                <td>
                  {formatDate(booking.startTime)} {' - '}
                  {formatTime(booking.startTime)}
                </td>
                <td>
                  {formatDate(booking.endTime)} {' - '}
                  {formatTime(booking.endTime)}
                </td>
                <td className='btns'>
                  <div className='admin-btns'>
                  <button className='approve_btn' onClick={() => handleAction('approved', booking._id)}>Approve</button>
                  <button className='reject_btn' onClick={() => handleAction('rejected', booking._id)}>Reject</button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"> No Pending Bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default AdminPanel;
