import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {makeBooking, clearMessage } from '../features/book/bookslice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back from '../assets/entypo_back.svg';


function Bookingform({ hall  ,onCancel }) {

    const dispatch = useDispatch()

    const isLoading = useSelector((state) => state.book.isLoading)
    const isError = useSelector((state) => state.book.isError)
    const isSuccess = useSelector((state) => state.book.isSuccess)
    const message = useSelector((state) => state.book.message)

    const [bookingInfo, setBookingInfo] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        coordinator: '',
        department: '',
        startTime: '',
        endTime: '',
      });

    useEffect(() => {
        if (isSuccess) {
          onCancel();
          console.log('success')
          toast.success('Successfully Booked..');
        }

        if(isError){
          toast.error(message)
        }

        dispatch(clearMessage());

    }, [isError, isSuccess, message, onCancel, dispatch]);


    
    const handleChange = (e) => {
        setBookingInfo((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };
    
    const handleSubmit =  (e) => {
        e.preventDefault();

        if (!bookingInfo.eventName || !bookingInfo.startDate || !bookingInfo.endDate || !bookingInfo.coordinator || !bookingInfo.department || !bookingInfo.startTime || !bookingInfo.endTime) {
          toast.error('Please fill in all required fields.');
          return;
        }

        console.log(bookingInfo.startDate,bookingInfo.startTime)
        console.log(bookingInfo.endDate,bookingInfo.endTime)


        // Convert start time and end time to Date objects
        const startDateTime = convertToISOString(bookingInfo.startDate, bookingInfo.startTime);
        const endDateTime = convertToISOString(bookingInfo.endDate, bookingInfo.endTime);

        console.log(startDateTime , 'and ' ,endDateTime)

        let current = new Date()
        current.setHours(current.getHours() + 5);
        current.setMinutes(current.getMinutes() + 30);
        current = current.toISOString()

        if(startDateTime <= current){
          console.log('less than current')
          toast.error('invalid start date or time')
          return
        }

        if(endDateTime <= startDateTime){
          console.log('invalid end date')
          toast.error('invalid end date or time')
          return
        }

  
        // sending to server
    
        const bookingData = {
          hallId:hall._id,
          event:bookingInfo.eventName,
          coordinator: bookingInfo.coordinator,
          startTime: startDateTime,
          endTime: endDateTime,
          department: bookingInfo.department,
        };

      
        dispatch(makeBooking(bookingData))

      };


      function convertToISOString(InputDate, InputTime) {
        if (!InputDate || !InputTime) {
          console.error("InputDate or InputTime is undefined");
          return null;
        }
      
        // Parse the date and time strings
        const [year, month, day] = InputDate.split("-").map(Number);
        const [hours, minutes] = InputTime.split(":").map(Number);
      
        // Construct a new Date object with the parsed values
        const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
      
        return date.toISOString();
      }
      

    if (isLoading) {
        return <Spinner />;
    }

  return (
    <>
    <h2>{hall.name}</h2>

    <div className="hall-creater">
        <button className="del-btn" onClick={onCancel}>
          <h4>Back</h4>
          <img src={back} alt="" />
        </button>
    </div>

    <form onSubmit={handleSubmit}>

            <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
                type="text"
                name="eventName"
                value={bookingInfo.eventName}
                onChange={handleChange}
                required
            />
            </div>

            <div className="parallel-input">
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                        type="date"
                        name="startDate"
                        value={bookingInfo.startDate}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input
                        type="time"
                        name="startTime"
                        value={bookingInfo.startTime}
                        onChange={handleChange}
                        required
                        />
                    </div>
            </div> 

            <div className="parallel-input">
                <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                    type="date"
                    name="endDate"
                    value={bookingInfo.endDate}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <input
                    type="time"
                    name="endTime"
                    value={bookingInfo.endTime}
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>

            <div className="form-group">
            <label htmlFor="coordinator">Coordinator</label>
            <input
                type="text"
                name="coordinator"
                value={bookingInfo.coordinator}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
                type="text"
                name="department"
                value={bookingInfo.department}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className='btn btn-block submit'>Submit</button>

    </form>

    </>
  )
}

export default Bookingform