import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) =>{
    try {
        const response = await axios.post(API_URL, userData);
    
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
    
        return response.data;
      } catch (error) {
        console.error('Error during user registration:', error);
        throw error;
      }
}


// login user
const login = async (userData) =>{
  try {
      const response = await axios.post(API_URL + "login" , userData);
  
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
  
      return response.data;
    } catch (error) {
      console.error('Error during login :', error);
      throw error;
    }
}



// Logout user
const logout =  ()=>{
  localStorage.removeItem('user')
}

const authService ={
    register,
    login,
    logout
}

export default authService