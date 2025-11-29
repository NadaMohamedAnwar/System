import React from 'react';
import logo from '../Images/Codeverse_FinalLogo.svg';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import LoginCss from '../Css/LoginCss.css';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLoginSuccess }){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  
  const handleLogin = async (event) => {
    event.preventDefault(); 
    setLoading(true);
    try {
      const response = await axios.post('https://agentsystem-development.up.railway.app/api/Account/login', {
        userName: username,
        password: password,
    });
      const { accessToken } = response.data;
      const { roles } = response.data;
      const { userId } = response.data;
      const { refreshTokenExpiryDate } = response.data;
      const{orgId}=response.data
      const{departments}=response.data
      localStorage.setItem('token', accessToken);
      localStorage.setItem('orgId', orgId);
      localStorage.setItem('id', userId);
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('departments',departments)
      localStorage.setItem('tokenExpiry', refreshTokenExpiryDate);

      onLoginSuccess(accessToken);
       console.log(response.data)
        // navigate('/dashboard-agent');
      
      if(roles.includes("SuperAdmin")){
        navigate('/organizations');
      }else{
        navigate('/dashboard-agent')
      }
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up request:', error.message);
    }
      toast.error('invalid credentials');
    }finally {
      setLoading(false); 
    }
  };
  // const fetchUserData = async (userId, token) => {
  //   try {
  //     const userResponse = await axios.get(`http://agentsys.runasp.net/api/Users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     console.log("User Data:", userResponse.data);
  //     localStorage.setItem("userData", JSON.stringify(userResponse.data)); 
  //   } catch (error) {
  //     console.error("Error fetching user data", error);
  //     toast.error("Failed to fetch user data.");
  //   }
  // };
  
    return(
        <div className='parent'>
          <div className='par  col-sm-12 col-md-8 col-lg-6'>
            <div className='login-div border-outline'>
              <h2 className='text-color'>Login</h2>
              <form onSubmit={handleLogin}>
              <div className="input-container">
                <i className="far fa-user"></i>
                <input
                  className="border-outline"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <i className="fas fa-lock"></i>
                <input
                  className="border-outline"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? (
                <span className="loader"></span> 
              ) : (
                'Login'
              )}</button>
            </form>
            </div>
            <div className='logo-div'>
              <span>Powered by</span>
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </div>
          <ToastContainer />
        </div>
    );
}
export default Login;