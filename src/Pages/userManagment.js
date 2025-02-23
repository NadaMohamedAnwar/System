import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { activateAdmin, activateUsers, DeactivateAdmin, DeactivateUsers, deleteUsers, fetchUsers, filterUsers } from "../Redux/Actions/Action";

function UserManagement() {
    const dispatch = useDispatch();
    const { FilterUsers} = useSelector((state) => state.Users);
    const roles = sessionStorage.getItem('roles');
    const [orgName, setorgName] = useState("");
    const [NationalId, setNationalId] = useState("");
    const [Phone, setPhone] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (Id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            dispatch(deleteUsers(Id))
                .then(() => toast.success("User deleted successfully"))
                .catch((err) => toast.error("Failed to delete User: " + err.message));
        }
    };
    const handleActivate = (id,role) => {
        let type="";
        if (role=="Agent"){
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
        if (role=="Agent"){
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
            dispatch(filterUsers(orgName, Phone,NationalId));
        };
        const resetData=()=>{
            dispatch(fetchUsers());
            setNationalId("")
            setPhone("")
            setorgName("")
        }
        // Call handleFilter on input change
        const handleOrgNameChange = (e) => {
            setorgName(e.target.value);
            // handleFilter();  
        };
        
        const handleNationalIdChange = (e) => {
            setNationalId(e.target.value);
            // handleFilter();  
        };
        
        const handlePhoneChange = (e) => {
            setPhone(e.target.value);
            // handleFilter();  
        };
        // useEffect(() => {
        //     handleFilter();
        // }, [orgName, Phone, NationalId]); 
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                        <div className="input-org-filter">
                            <label>Organization</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={orgName}
                            onChange={handleOrgNameChange}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>National Id</label>
                            <input 
                            type="number"
                            placeholder="Enter Start Date"
                            value={NationalId}
                            onChange={handleNationalIdChange}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>phone</label>
                            <input 
                            type="number"
                            placeholder="Enter Start Date"
                            value={Phone}
                            onChange={handlePhoneChange}
                            />
                        </div>
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    
                    </div>
                    <div className="head-icon">
                        <h4 className="check-head text-color">All Users</h4>
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
                                <th>Phone</th>
                                <th>Organization</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>userStatus</th>
                                {(roles.includes("SuperAdmin") || roles.includes("OrgAdmin"))&&<th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {FilterUsers.length > 0 ? (
                                FilterUsers.map((User) => (
                                    <tr key={User.id} onClick={() =>
                                        navigate(`/view-user/${User.id}`, { state: { User } })
                                    }>
                                        <td>{User.userName}</td>
                                        <td>{User.email}</td>
                                        <td>{User.phone}</td>
                                        <td>{User.organization}</td>
                                        <td>{User.departments}</td>
                                        <td>{User.role}</td>
                                        <td>{User.isActive ? "Active" : "Inactive"}</td>
                                       
                                           
                                        { (User.role=="Agent" && (roles.includes("SuperAdmin") || roles.includes("OrgAdmin"))) &&
                                        <td>
                                            <FontAwesomeIcon
                                            className="icon-edit"
                                            icon={faEdit}
                                            onClick={() =>
                                                navigate(`/edit-User/${User.role}`, { state: { User } })
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
                                            icon={faEdit}
                                            onClick={() =>
                                                navigate(`/edit-User/${User.role}`, { state: { User } })
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
