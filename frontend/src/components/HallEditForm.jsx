import React, { useState, useEffect } from 'react';
import back from '../assets/entypo_back.svg';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateHalls } from '../features/hall/hallSlice';
import { toast } from 'react-toastify';

function HallEditForm({ hall,onCancel }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name:hall.name,
    capacity:hall.capacity,
    location:hall.location,
    inChargePerson:hall.inChargePerson,
    contactNumber: hall.contactNumber,
    amenities: hall.amenities,
  });
  const { isSuccess, isError, message } = useSelector((state) => state.halls);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess) {
      dispatch(reset());
      onCancel()
    }

  }, [isError, isSuccess, message, onCancel, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('edit button clicked')
    dispatch(updateHalls({hallId:hall._id , hallData:formData}));
  };

  return (
    <>
      <div className="hall-creater">
        <button className="del-btn" onClick={onCancel}>
          <h4>Back</h4>
          <img src={back} alt="" />
        </button>
      </div>

      <br />

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="name" name="name" placeholder="Enter hall name" value={formData.name} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="number" className="form-control" id="capacity" name="capacity" placeholder="Enter hall capacity" value={formData.capacity} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="location" name="location" placeholder="Enter hall location" value={formData.location} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="inChargePerson" name="inChargePerson" placeholder="Enter your inChargePerson" value={formData.inChargePerson} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="tel" className="form-control" id="contactNumber" name="contactNumber" placeholder="Enter your contactNumber" value={formData.contactNumber} onChange={onChange} />
        </div>
        <div className="form-group">
          <select name="amenities" id="amenities" value={formData.amenities} onChange={onChange}>
            <option value="non-a/c">non-a/c</option>
            <option value="a/c">a/c</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block submit r-submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default HallEditForm;
