import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import create from '../assets/gridicons_create.svg';
import { Link } from 'react-router-dom';
import HallForm from './HallForm';
import HallEditForm from './HallEditForm';
import Spinner from './Spinner';
import { getHalls, deleteHalls, reset, updateHalls } from '../features/hall/hallSlice';
import { toast } from 'react-toastify';

function Halls() {
  const dispatch = useDispatch();
  const { halls, isSuccess, isError, isLoading ,message} = useSelector((state) => state.halls);

// Toggling - Create Form 
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () =>{
    dispatch(reset())
    setShowForm(!showForm)
  }


// Togglling - Edit form 
 const [editingHall , setEditingHall] = useState({})
 const [showEditForm, setEditShowForm] = useState(false);

  const toggleEditForm = () =>{
    dispatch(reset())
    setEditShowForm(!showForm)
  }



  
  useEffect(() => {
    dispatch(getHalls());
  }, []);

  useEffect(()=>{
    if(isSuccess){
      dispatch(reset())
    }
    if(isError){
      toast.error(message)
    }
    return(()=>{
      dispatch(reset())
    })
  },[dispatch , showForm])
  
  useEffect(()=>{
    if(!showEditForm){
      dispatch(getHalls())
    }   
  },[showEditForm])




// Delete functionality

  const handleDelete = (hallId) => {
    dispatch(deleteHalls(hallId));
  };


// Edit functionality

  const handleEdit = (hall) => {
    setEditingHall(hall)
    toggleEditForm()
  };



  if (isLoading) return <Spinner />;

  return (
    <>
      {
      showForm ? 
      ( <HallForm onCancel={() => setShowForm(false)} /> ) 
      :
      showEditForm ?
      ( <HallEditForm  hall = {editingHall}   onCancel={() => setEditShowForm(false)} />) 
      : 
      (
        <>
          <div className="hall-creater">
            <button className="create-btn" onClick={() =>toggleForm()}>
              <img src={create} alt="" />
              <h4> Create Hall</h4>
            </button>
          </div>

          <div className="hall-container">
            {halls &&
              halls.map((hall) => (
                <div key={hall._id} className="hall-card">
                  <div className="hall-info">
                    <div className="info">
                      <h2>{hall.name}</h2>
                      <p>{hall.amenities}</p>
                    </div>
                    <div className="hall-btns">
                      <button onClick={() => handleEdit(hall)} className="hall-info-btn">
                        <FaEdit />
                      </button>

                      <button onClick={() => handleDelete(hall._id)} className="hall-info-btn">
                        <FaTrashAlt />
                      </button>
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
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Halls;
