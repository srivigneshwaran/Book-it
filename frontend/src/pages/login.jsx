import React from 'react'
import Logo from '../components/Logo'
import {Link , useNavigate} from 'react-router-dom'
import { useState , useEffect } from 'react'

import {toast} from 'react-toastify'
import { useDispatch , useSelector} from 'react-redux'
import {login , reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'




function Login() {

  const [formData , setFormData ] = useState({
    email :'',
    password:''
  })

  const { email ,password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user , isLoading , isError , isSuccess , message} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess ){
      toast.success(`Welcome ${user.name}`)
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
    
    const userData ={
      email ,
      password
    }
    dispatch(login(userData))

  }

  //loader
  if(isLoading){
    return <Spinner />
  }

  return (
    <>

        <section className="heading" >
            <Logo width='230px'/>
            <h1>LOGIN</h1>
            <p>login and book your slot</p>
        </section>
        
        <section className="form"  >
          <form onSubmit={onSubmit}>

            <div className="form-group">
                <input type="email" className="form-control" id='email'name='email' placeholder='Enter your email' value={email} onChange={onChange} />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id='password'name='password' placeholder='Enter your password' value={password} onChange={onChange} />
            </div>

            <div className="form-group">
              <button type='submit' className='btn btn-block'>
                Login
              </button>
            </div>
            
          </form>
        </section>

        <section className='footer' >
          <p>Don't have an account ? 
            <Link to={'/register'} style={{color:"blue"}}> register now</Link>
          </p>
        </section>

    </>
  )
}

export default Login