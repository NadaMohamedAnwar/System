import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus,faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { activateAdmin, activateUsers, DeactivateAdmin, DeactivateUsers, deleteUsers, fetchUsers, filterUsers } from "../Redux/Actions/Action";

function UserManagement() {
    const dispatch = useDispatch();
    const { FilterUsers} = useSelector((state) => state.Users);
    const roles = localStorage.getItem('roles');
    const [orgName, setorgName] = useState("");
    const [NationalId, setNationalId] = useState("");
    const [username, setusername] = useState("");
    const [status, setStatus] = useState(""); 
    const [email, setemail] = useState("");
    const [role, setrole] = useState("");
    const [Phone, setPhone] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // useEffect(() => {
    //    console.log(FilterUsers)
    // }, [FilterUsers]);

    const handleActivate = (id,role) => {
        let type="";
        if (role.includes("Agent")){
          type="ActiveAgent"
        }
       ;
        if (window.confirm("Are you sure you want to Activate this User?")) {
            dispatch(activateUsers(id,type))
                .then(() => toast.success("User Activated successfully"))
                .catch((err) => toast.error("Failed to Activate User: " + err.message));
        }
    };
    const handleDeactivate = (id,role) => {
        let type="";
        if (role.includes("Agent")){
           type="DeActiveAgent"
        }
        if (window.confirm("Are you sure you want to Deactivate this User?")) {
            dispatch(DeactivateUsers(id,type))
                .then(() => toast.success("User Deactivate successfully"))
                .catch((err) => toast.error("Failed to Deactivate User: " + err.message));
        }
    };
    const handleActivateAdmin = (id) => {
       
        if (window.confirm("Are you sure you want to Activate this User?")) {
            dispatch(activateAdmin(id))
                .then(() => toast.success("User Activated successfully"))
                .catch((err) => toast.error("Failed to Activate User: " + err.message));
        }
    };
    const handleDeactivateAdmin = (id) => {
       
        if (window.confirm("Are you sure you want to Deactivate this User?")) {
            dispatch(DeactivateAdmin(id))
                .then(() => toast.success("User Deactivate successfully"))
                .catch((err) => toast.error("Failed to Deactivate User: " + err.message));
        }
    };
    
        const handleFilter = () => {
            dispatch(filterUsers(username,email,NationalId,Phone,orgName, role,status));
        };
        const resetData=()=>{
            dispatch(fetchUsers());
            setNationalId("")
            setPhone("")
            setorgName("")
            setemail("")
            setusername("")
            setrole("")
            setStatus("")
        }
    
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                       
                        <div className="input-org-filter">
                            <label>Usename</label>
                            <input 
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Email</label>
                            <input 
                            type="text"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>National Id</label>
                            <input 
                            type="number"
                            placeholder="Enter National Id"
                            value={NationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>phone</label>
                            <input 
                            type="number"
                            placeholder="Enter Phone"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Organization</label>
                            <input 
                            type="text"
                            placeholder="Enter Organization"
                            value={orgName}
                            onChange={(e) => setorgName(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Role</label>
                            <input 
                            type="text"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) => setrole(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value === "true")}>
                            <option value="">Select Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>

                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    
                    </div>
                    <div className="head-icon">
                        <h4 className="check-head text-color">All Users: {FilterUsers.length}</h4>
                        <FontAwesomeIcon
                            onClick={() => navigate("/add-user")}
                            className="icon-edit"
                            icon={faPlus}
                        />
                        
                    </div>
                    <table>
                        <thead>
                            <tr>
                               <th>Username</th>
                                <th>Email</th>
                                <th>National Id</th>
                                <th>Phone</th>
                                <th>Organization</th>
                                {/* <th>Department</th> */}
                                <th>Role</th>
                                <th>userStatus</th>
                                {(roles.includes("SuperAdmin") || roles.includes("OrgAdmin"))&&<th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {FilterUsers.length > 0 ? (
                                FilterUsers.map((User) => (
                                    <tr key={User.id} >
                                        <td>{User.userName}</td>
                                        <td>{User.email}</td>
                                        <td>{User.nationalId}</td>
                                        <td>{User.phone}</td>
                                        <td>{User.organization}</td>
                                        {/* <td>{User.departments}</td> */}
                                        <td>{User.role}</td>
                                        <td>{User.isActive ? "Active" : "Inactive"}</td>
                                       
                                           
                                        { (User.role.includes("Agent") && (roles.includes("SuperAdmin") || roles.includes("OrgAdmin"))) &&
                                        <td>
                                            <FontAwesomeIcon
                                                className="icon-edit"
                                                icon={faEye}
                                                onClick={() =>
                                                    navigate(`/view-user/${User.id}`, { state: { User } })
                                                }
                                            />
                                            <FontAwesomeIcon
                                            className="icon-edit"
                                            icon={faEdit}
                                            onClick={() =>
                                                navigate(`/edit-agent`, { state: { User } })
                                            }
                                            />
                                            <button 
                                                className="manage-buttons" 
                                                onClick={() => User.isActive ? handleDeactivate(User.id,User.role) : handleActivate(User.id,User.role)}
                                            >
                                                {User.isActive ? "Disable" : "Enable"}
                                            </button>
                                        </td>
                                        }
                                        { ((User.role=="OrgAdmin" || User.role=="HeadManager" || User.role=="Manager")&& (roles.includes("SuperAdmin") ||roles.includes("OrgAdmin")))&&
                                        <td>
                                            <FontAwesomeIcon
                                                className="icon-edit"
                                                icon={faEye}
                                                onClick={() =>
                                                    navigate(`/view-user/${User.id}`, { state: { User } })
                                                }
                                            />
                                            <FontAwesomeIcon
                                            className="icon-edit"
                                            icon={faEdit}
                                            onClick={() =>
                                                navigate(`/edit-User/${User.id}`)
                                            }
                                            />
                                            <button 
                                                className="manage-buttons" 
                                                onClick={() => User.isActive ? handleDeactivateAdmin(User.id) : handleActivateAdmin(User.id)}
                                            >
                                                {User.isActive ? "Disable" : "Enable"}
                                            </button>
                                        </td>
                                        }
                                        
                                       
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No Users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default UserManagement;
