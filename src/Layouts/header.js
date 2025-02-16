import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import logo from '../Images/Codeverse_FinalLogo.svg';
import defaultProfile from "../Images/profile-user-svgrepo-com.svg"; 
import "../Css/HeaderCss.css";

function Header() {
  const navigate = useNavigate();

  const userProfile = {
    image: null,
  };

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
          src={userProfile.image || defaultProfile} // Use user's image or default
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
