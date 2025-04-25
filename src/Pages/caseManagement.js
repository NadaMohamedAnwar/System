import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus,faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteCases, fetchCases, fetchClients, filterCases } from "../Redux/Actions/Action";

function CaseManagement() {
    const dispatch = useDispatch();
    const { FilteredCases} = useSelector((state) => state.Cases);
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [Lawyer, setlawer] = useState("");
    const [Party, setparty] = useState("");
    const [sDate, setsDate] = useState("");
    const [clientId, setClientId] = useState("");
    const { Clients } = useSelector((state) => state.Clients);
    const orgId=parseInt(localStorage.getItem("orgId"), 10)
    const userRoles=localStorage.getItem("roles")
    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);
      
    useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]); 
    
    const handleFilter = () => {
        dispatch(filterCases(name,Lawyer,Party, sDate,parseInt(clientId,10)));
    };
    const resetData=()=>{
        dispatch(fetchCases());
        setClientId("")
        setname("")
        setsDate("")
        setlawer("")
        setparty("")
    }
    // Call handleFilter on input change
    const handleLawerChange = (e) => {
        setlawer(e.target.value);
         
    };
    const handlePartyChange = (e) => {
        setparty(e.target.value);
         
    };
    const handleNameChange = (e) => {
        setname(e.target.value);
         
    };
    
    const handleClientChange = (e) => {
        setClientId(e.target.value);
   
    };
    
    const handleDateChange = (e) => {
        setsDate(e.target.value);
     
    };
    // useEffect(() => {
    //     handleFilter();
    // }, [name, sDate, clientId]); 
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Case?")) {
            dispatch(deleteCases(id))
                .then(() => toast.success("Case deleted successfully"))
                .catch((err) => toast.error("Failed to delete Case: " + err.message));
        }
    };
    const getclientName=(clientId)=>{
        const client = Clients.find((c) => c.id === clientId);
        return  client?client.contactName:"Unknown";
    }
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                        <div className="input-org-filter">
                            <label>Case Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={name}
                            onChange={handleNameChange}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Opposing Lawyer</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={Lawyer}
                            onChange={handleLawerChange}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Opposing Party</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={Party}
                            onChange={handlePartyChange}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Start Date</label>
                            <input 
                            type="date"
                            placeholder="Enter Start Date"
                            value={sDate}
                            onChange={handleDateChange}
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Client ID</label>
                            <select
                                value={clientId}
                                onChange={handleClientChange}
                            >
                                <option value="">Select Client</option>
                                {Clients && Clients.length > 0 ? (
                                Clients.map((client) => (
                                    <option key={client.id} value={client.id}>{client.contactName}</option>
                                ))
                                ) : (
                                <option>No Clients available</option>
                                )}
                            </select>
                        </div>
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    
                    </div>
                    <div className="table-container">
                        <div className="head-icon">
                            <h4 className="check-head text-color">Cases:{FilteredCases.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-case")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Case Title</th>  
                                    <th>Opposing Lawyer</th>
                                    <th>Opposing Party</th>
                                    <th>Start Date</th>
                                    <th>Client</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FilteredCases.length > 0 ? (
                                    FilteredCases.map((Case) => (
                                        <tr key={Case.id}  >
                                            <td >{Case.title}</td>
                                            <td>{Case.opposingLawyer}</td>
                                            <td>{Case.opposingParty}</td>
                                            <td>{Case.startDate}</td>
                                            <td>{getclientName(Case.clientId)}</td>
                                            <td>
                                            <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEye}
                                                    onClick={() =>
                                                        navigate(`/view-case/${Case.id}`, { state: { Case } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-case/${Case.id}`, { state: { Case } })
                                                    }
                                                />
                                                {/* <FontAwesomeIcon
                                                    className="icon-del"
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(Case.id)}
                                                /> */}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Cases found</td>
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

export default CaseManagement;
