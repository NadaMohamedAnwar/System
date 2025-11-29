import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const RouterAware = ({ token, refreshAccessToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (!token) {
        if (location.pathname !== '/') {
          navigate('/'); // Redirect to login page if not logged in
        }
      } else {
        const role = localStorage.getItem('role');
        if (!role) return; // If role is not available, don't redirect yet
  
        if (location.pathname === '/') {
          if (role === 'SuperAdmin') {
            navigate('/organizations');
          } else {
            navigate('/dashboard-agent');
          }
        }
      }
    }, [token]);
  
    return null;
  };
  
  export default RouterAware; 