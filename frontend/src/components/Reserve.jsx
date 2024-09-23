import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux';
import BookingForm from './Bookingform';
import { getHalls } from '../features/hall/hallSlice';
function Reserve() {

  const dispatch = useDispatch();
  const { halls, isSuccess, isError, isLoading ,message} = useSelector((state) => state.halls);

  // Hall details for booking
  const[hall , setHall] = useState({})


  // Toggling - Create Form 
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () =>{
    setShowForm(!showForm)
  }

  useEffect(() => {
    dispatch(getHalls());
  }, []);

  const handleBook = (hall) =>{
    setHall(hall)
    toggleForm()
  }

  
  return (
    <>
    {
    showForm ? 
    ( 
      <BookingForm   hall ={hall}  onCancel={() => setShowForm(false)} /> 
    )
    :(
      <div >
        <h2> Reserve Hall </h2>

        <div className="hall-container">

              {halls &&
                halls.map((hall) => (
                  <div key={hall._id} className="hall-card">
                    <div className="hall-info">
                      <div className="info">
                        <h2>{hall.name}</h2>
                        <p>{hall.amenities}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="hall-details">
                      <p>
                        <b>Capacity: </b>
                        {hall.capacity}
                      </p>
                      <p>
                        <b>Location:</b> {hall.location}
                      </p>
                      <p>
                        <b>In Charge Person:</b> {hall.inChargePerson}
                      </p>
                      <p>
                        <b>Contact: </b>
                        {hall.contactNumber}
                      </p>
                    </div>
                    <button onClick={() => handleBook(hall)} className="Book-btn">
                        Book now
                    </button>
                  </div>
                ))}
        </div>
      </div>

    ) }
    </>
  )
}

export default Reserve