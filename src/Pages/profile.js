import React, { useEffect } from "react";
import SidebarMenu from "../Layouts/sidemenue";
import profile from "../Css/Profile.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Redux/Actions/Action";
import defaultProfile from "../Images/profile-user-svgrepo-com.svg"; 
const Profile=()=>{
       const { Profile} = useSelector((state) => state.Users);
      const dispatch = useDispatch();
      useEffect(()=>{
          dispatch(getUserProfile())
      
         },[dispatch])
        //  useEffect(()=>{
        //     console.log(Profile)
        
        //    },[Profile])
    return(
        <div className="d-flex">
        <SidebarMenu />
            <div className="manage col-sm-12 col-md-10 col-lg-8 mx-auto">
               <div className="profile">
               <div className="headProfile">
               <div className="profile-image">
                    <h3 style={{color:"white",margin:"7px"}}>Profile</h3>
                    <div className="imageContainer">
                        <img
                             src={Profile?.picture ? `http://agentsys.runasp.net${Profile.picture}` : defaultProfile} 
                            alt="Profile"
                            className="photo"
                        />
                    </div>
                </div>

                </div>
                

             
                <div className="profileData">
                
                    <div className="input-profile">
                        <label>Username</label>
                        <input
                            type="text" disabled
                            value={Profile.username}
                           
                        />
                    </div>
                    <div className="input-profile">
                        <label>Organization</label>
                        <input
                            type="text" disabled
                            value={Profile.organizationName}
                       
                        />
                    </div>
                    <div className="input-profile">
                        <label>Email</label>
                        <input
                            type="text" disabled
                            value={Profile.businessUserId}
                           
                        />
                    </div>
                    <div className="input-profile">
                        <label>Phone</label>
                        <input
                            type="text" disabled
                            value={Profile.phoneNumber}
                           
                        />
                    </div>

                    <div className="input-profile">
                        <label>Business User Id</label>
                        <input
                            type="text" disabled
                            value={Profile.businessUserId}
                
                        />
                    </div>
                    <div className="input-profile">
                        <label>NationalId Id</label>
                        <input
                            type="text" disabled
                            value={Profile.userNationalId}
                            
                        />
                    </div>

                    


                </div>
               </div>

            </div>
        </div>
    )

}
export default Profile;