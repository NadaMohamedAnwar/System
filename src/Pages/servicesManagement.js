import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteServices, fetchServices, filterService } from "../Redux/Actions/Action";

function ServicesManagement() {
    const dispatch = useDispatch();
    const { FilterServices, loading, error } = useSelector((state) => state.Services);
    const [profile, setprofile] = useState("1");
    const [name, setname] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Service?")) {
            dispatch(deleteServices(id))
                .then(() => toast.success("Service deleted successfully"))
                .catch((err) => toast.error("Failed to delete Service: " + err.message));
        }
    };
    const handleFilter = () => {
        dispatch(filterService(name,profile));
    };
    
    const resetData=()=>{
    dispatch(fetchServices());
    setprofile("")
    setname("")
    }

    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                
                <div>
                <div className="filter-div">
                          
                        <div className="input-org-filter">
                            <label>Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}  
                            />
                        </div>
                        <div className="input-org-filter">
                        <label>Profile Type</label>
                            <select
                                value={profile}
                                onChange={(e) => setprofile(e.target.value)}
                            >
                                <option value="Sales">Sales</option>
                                <option value="AfterSales">AfterSales</option>
                                <option value="Lawyers">Lawyers</option>
                                <option value="Inspection">Inspection</option>
                                <option value="Delivery">Delivery</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                        
                    </div>
                    <div className="table-container">
                        <div className="head-icon">
                            <h4 className="check-head text-color">Services: {FilterServices.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-service")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Service Name</th>
                                    <th>Profile Name</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {FilterServices.length > 0 ? (
                                    FilterServices.map((Service) => (
                                        <tr key={Service.id}>
                                            <td>{Service.name}</td>
                                            <td>{Service.profileName}</td>
                                            {/* <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-service/${Service.id}`, { state: { Service } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-del"
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(Service.id)}
                                                />
                                            </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Service found</td>
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

export default ServicesManagement;
