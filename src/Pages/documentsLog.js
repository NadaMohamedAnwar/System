import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus,faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { fetchDocumentsLog } from "../Redux/Actions/Action";

function DocumentsLog() {
    const dispatch = useDispatch();
    const { DocumentLog } = useSelector((state) => state.Documents);
    const [name, setname] = useState("");
  
    const navigate = useNavigate();

    useEffect(() => {
       dispatch(fetchDocumentsLog())
    }, [dispatch]);

    
        const handleFilter = () => {
                //  dispatch(filterOrgs(name));
            };

        const resetData=()=>{
        dispatch(fetchDocumentsLog());
        setname("")
        }
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                            
                        
                        <div className="input-org-filter">
                            <label>Document Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Case Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}  
                            />
                        </div>
                        
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                        
                    </div>
                    <div className="table-container">

                        <div className="head-icon">
                            <h4 className="check-head text-color">Documents Log</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-org")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Document Name</th>
                                    <th>Document Status</th>
                                    <th>Document Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DocumentLog.length > 0 ? (
                                    DocumentLog.map((doc) => (
                                        <tr >
                                            <td>
                                            <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEye}
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
                                        <td colSpan="2">No Documents found</td>
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

export default DocumentsLog;
