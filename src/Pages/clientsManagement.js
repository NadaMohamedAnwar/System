import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus ,faEye} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteClient, fetchClients, filterClientDate } from "../Redux/Actions/Action";

function ClientsManagement() {
    const dispatch = useDispatch();
    const { Clients, filteredClients } = useSelector((state) => state.Clients);
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const orgId = parseInt(sessionStorage.getItem("orgId"), 10);
    const userRoles = sessionStorage.getItem("roles");

    // Fetch Clients on component mount
    useEffect(() => {
        dispatch(fetchClients()).then(() => {
            
            dispatch(filterClientDate("", "", "", ""));
            
        });
    }, [dispatch]); 
    
    

    // useEffect(() => {
    //     if (Clients.length === 0) {
    //         dispatch(fetchClients()).then(() => {
    //             if (userRoles.includes("SuperAdmin")) {
    //                 dispatch(filterClientDate("", "", "", "", ""));
    //             } else {
    //                 dispatch(filterClientDate(orgId, "", "", "", ""));
    //             }
    //         });
    //     }
    // }, [orgId, userRoles]); 
    
    const handleFilter = () => {
        console.log("Filtering with:", { orgId, name, contactName, phone, address });
    
        if (Clients.length > 0) {  // Only filter if Clients exist
           
            dispatch(filterClientDate( name, contactName, phone, address));
            
        } else {
            console.warn("No Clients available to filter.");
        }
    };
    
    const resetData = () => {
        setName("");
        setContactName("");
        setPhone("");
        setAddress("");
        
        if (Clients.length > 0) {
            dispatch(filterClientDate( "", "", "", ""));
        }
    };
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Client?")) {
            dispatch(deleteClient(id))
                .then(() => toast.success("Client deleted successfully"))
                .catch((err) => toast.error("Failed to delete Client: " + err.message));
        }
    };

    return (
        <div className="d-flex">
            <SidebarMenu />
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                        <div className="input-org-filter">
                            <label>Account Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Contact Name</label>
                            <input
                                type="text"
                                placeholder="Enter Contact Name"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Phone</label>
                            <input
                                type="number"
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Account Address</label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    </div>
                    <div className="table-container">
                        <div className="head-icon">
                            <h4 className="check-head text-color">Clients: {filteredClients.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-client")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Account Name</th>
                                    <th>Contact Name</th>
                                    <th>Contact Mobile Number</th>
                                    <th>Account Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.length > 0 ? (
                                    filteredClients.map((Client) => (
                                        <tr key={Client.id} >
                                            <td>{Client.accountName}</td>
                                            <td>{Client.contactName}</td>
                                            <td>{Client.contactMobileNumber}</td>
                                            <td>{Client.accountAddress}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEye}
                                                    onClick={() =>
                                                        navigate(`/view-client/${Client.id}`, { state: { Client } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-client/${Client.id}`, { state: { Client } })
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No Clients found</td>
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

export default ClientsManagement;
