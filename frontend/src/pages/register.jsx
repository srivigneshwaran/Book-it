import React from 'react'
import Header from '../components/header'
import { useState , useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { useDispatch , useSelector} from 'react-redux'
import {register , reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {

  const [formData , setFormData ] = useState({
    name: '',
    email :'',
    password:'',
    password2:'',
    role:'user'
  })

  const {name , email ,password , password2 , role} = formData
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user , isLoading , isError , isSuccess , message} = useSelector((state) => state.auth)

 useEffect(()=>{
  if(isError){
    toast.error(message)
  }
  if(isSuccess ){
    toast.success('Registration completed')
    navigate('/')
  }

  dispatch(reset())

 } , [user , isError , isSuccess , message , navigate , dispatch])

  const onChange =(e) =>{
    setFormData((prevState) =>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmit=(e) =>{
    e.preventDefault()

    if(password !== password2){
      toast.error('Passwords dosen\'t match')
    }
    else{
      const userData = {
        name,
        email,
        password ,
        role
      }
      dispatch(register(userData))
    }
  }

  //loader
  if(isLoading){
    return <Spinner />
  }


  return (
    <>
    <Header/>
    <p>Please create an account</p>
    <section className="form">
      <form onSubmit={onSubmit} >
        <div className="form-group">
            <input type="text" className="form-control" id='name'name='name'  placeholder='Enter your name' value={name} onChange={onChange}   />
        </div>
        <div className="form-group">
            <input type="email" className="form-control" id='email'name='email'  placeholder='Enter your email' value={email} onChange={onChange}      />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id='password'name='password'  placeholder='Enter your password' value={password} onChange={onChange}      />
        </div>
        <div className="form-group">
            <input type="password" className="form-control" id='password2'name='password2'  placeholder='Confirm your password' value={password2}  onChange={onChange}     />
        </div>
        <div className="form-group">
          <select name="role" id="role" value={role} onChange={onChange}>
          <option value="admin">Admin</option>
          <option value="user" >User</option>   
          </select>
        </div>
        <div className="form-group">
          <button type='submit' className='btn btn-block submit r-submit'>
            Submit
          </button>
        </div>
        
      </form>
    </section>
    </>
    
  )
}

export default Register