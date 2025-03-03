import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { activateOrgs, deleteOrg, fetchOrgs, filterOrgs } from "../Redux/Actions/Action";

function OrgManagement() {
    const dispatch = useDispatch();
    const { FilterOrgs, loading, error } = useSelector((state) => state.Orgs);
    const [status, setStatus] = useState("");
    const [name, setname] = useState("");
    const [type, settype] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchOrgs());
    }, [dispatch]);

    const handleDelete = (Id) => {
        if (window.confirm("Are you sure you want to delete this organization?")) {
            dispatch(deleteOrg(Id))
                .then(() => toast.success("Organization deleted successfully"))
                .catch((err) => toast.error("Failed to delete Organization: " + err.message));
        }
    };
    const handleActivate = (id) => {
            if (window.confirm("Are you sure you want to Activate this Organization?")) {
                dispatch(activateOrgs(id))
                    .then(() => toast.success("Organization Activated successfully"))
                    .catch((err) => toast.error("Failed to Activate Organization: " + err.message));
            }
        };
        const handleDeactivate = (id) => {
            if (window.confirm("Are you sure you want to Deactivate this Organization?")) {
                // dispatch(DeactivateUsers(id))
                //     .then(() => toast.success("Organization Deactivate successfully"))
                //     .catch((err) => toast.error("Failed to Deactivate Organization: " + err.message));
            }
        };
        const handleFilter = () => {
                 dispatch(filterOrgs(name,type,status));
            };

        const resetData=()=>{
        dispatch(fetchOrgs());
        setStatus(true)
        setname("")
        settype("") 
        }
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                {/* {loading && <p>Loading Products...</p>}
                {error && <p>Error: {error}</p>} */}
                <div>
                    <div className="filter-div">
                            
                        
                        <div className="input-org-filter">
                            <label>Organization Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Industry Type</label>
                            <select
                                value={type}
                                onChange={(e) => settype(e.target.value)}
                            >
                                <option value="">Select Industry Type</option>
                                <option value="Retail">Retail</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="IT">IT</option>
                                <option value="Education">Education</option>
                                <option value="RealEstate">RealEstate</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Construction">Construction</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Energy">Energy</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Telecommunications">Telecommunications</option>
                                <option value="Other">Other</option>
                            </select>
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
                    <div className="table-container">

                        <div className="head-icon">
                            <h4 className="check-head text-color">All Organizations</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-org")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Organization Name</th>
                                    <th>Organization Status</th>
                                    <th>Organization Type</th>
                                    <th>Contact Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FilterOrgs.length > 0 ? (
                                    FilterOrgs.map((org) => (
                                        <tr key={org.id}  onClick={() =>
                                            navigate('/view-org', { state: { org } })
                                        }>
                                            <td>{org.organizationName}</td>
                                            <td>{org.organizationStatus ? "Active" : "Inactive"}</td>
                                            <td>{org.organizationType}</td>
                                            <td>{org.primaryContactEmail}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-org/${org.id}`, { state: { org } })
                                                    }
                                                />
                                            {/* <button 
                                                    className="manage-buttons" 
                                                    onClick={() => org.organizationStatus ? handleDeactivate(org.id) : handleActivate(org.id)}
                                                >
                                                    {org.organizationStatus ? "Disable" : "Enable"}
                                                </button> */}
                                            </td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Organaiztion found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default OrgManagement;
