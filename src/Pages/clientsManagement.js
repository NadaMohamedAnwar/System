import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteClient, fetchClients } from "../Redux/Actions/Action";

function ClientsManagement() {
    const dispatch = useDispatch();
    const { Clients, loading, error } = useSelector((state) => state.Clients);
    const navigate = useNavigate();
    const[clients,setclients]=useState([])
   const orgId=parseInt(sessionStorage.getItem("orgId"), 10)
   const userRoles=sessionStorage.getItem("roles")
     useEffect(() => {
           dispatch(fetchClients());
       }, [dispatch]); 
       
       useEffect(() => {
           if (Clients.length > 0) {
            if (userRoles.includes("SuperAdmin")){
                const filteredClients=Clients;
                setclients(filteredClients);
               console.log("Filtered Clients:", filteredClients);
    
            }else{
                const filteredClients = Clients.filter((c) => c.organizationId === orgId);
                setclients(filteredClients);
               console.log("Filtered Clients:", filteredClients);
            } 
           }
       }, [Clients, orgId]);
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Client?")) {
            dispatch(deleteClient(id))
                .then(() => toast.success("Client deleted successfully"))
                .catch((err) => toast.error("Failed to delete Client: " + err.message));
        }
    };

    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                {/* {loading && <p>Loading Products...</p>}
                {error && <p>Error: {error}</p>} */}
                <div>
                    <div className="head-icon">
                        <h4 className="check-head text-color">All Clients</h4>
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
                            {clients.length > 0 ? (
                                clients.map((Client) => (
                                    <tr key={Client.id} >
                                        <td>{Client.accountName}</td>
                                        <td>{Client.contactName}</td>
                                        <td>{Client.contactMobileNumber}</td>
                                        <td>{Client.accountAddress}</td>
                                        <td>
                                            <FontAwesomeIcon
                                                className="icon-edit"
                                                icon={faEdit}
                                                onClick={() =>
                                                    navigate(`/edit-client/${Client.id}`, { state: { Client } })
                                                }
                                            />
                                            {/* <FontAwesomeIcon
                                                className="icon-del"
                                                icon={faTrash}
                                                onClick={() => handleDelete(Client.id)}
                                            /> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No Clients found</td>
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

export default ClientsManagement;
