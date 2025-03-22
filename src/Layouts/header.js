import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import logo from '../Images/Codeverse_FinalLogo.svg';
import defaultProfile from "../Images/profile-user-svgrepo-com.svg"; 
import "../Css/HeaderCss.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Redux/Actions/Action";

function Header() {
  const navigate = useNavigate();
   const { Profile} = useSelector((state) => state.Users);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserProfile())
    
        },[dispatch])

   useEffect(()=>{
    dispatch(getUserProfile())

   },[])
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <img
           src={Profile?.picture ? `http://agentsys.runasp.net${Profile.picture}` : defaultProfile} 
          alt="Profile"
          className="profile-photo"
        />
        <IoNotifications className="icon notification-icon" />
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;
