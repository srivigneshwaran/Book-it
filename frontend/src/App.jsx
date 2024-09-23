import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import DashBoard from './pages/dashboard'
import Register from './pages/register'
import Login from './pages/login'


function App() {
  return (
    <>
    <Router>
      
      <div className="container">
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        
      </div>

    </Router>

    

    </>
    
  )
}

export default App