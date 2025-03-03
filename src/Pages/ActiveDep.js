import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteDepartment, fetchActiveDepartments, fetchInActiveDepartments, filterDeps } from "../Redux/Actions/Action";

function ActiveDep() {
    const dispatch = useDispatch();
    const { FilterDepartments} = useSelector((state) => state.Departments);
    const [profile, setprofile] = useState("1");
    const [status, setstatus] = useState("0");
    const [name, setname] = useState("");
    const navigate = useNavigate();
    const orgId = sessionStorage.getItem('orgId')
    useEffect(() => {
        if (status === "0") {
            dispatch(fetchActiveDepartments(orgId));
        }
        if (status === "1") {
            dispatch(fetchInActiveDepartments());
        }
    }, [dispatch, status, orgId]); 
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Department?")) {
            dispatch(deleteDepartment(id))
                .then(() => toast.success("Department deleted successfully"))
                .catch((err) => toast.error("Failed to delete Department: " + err.message));
        }
    };
    const handleFilter = () => {
            dispatch(filterDeps(name,profile));
        };
        
        const resetData = () => {
            setstatus("0"); 
            setprofile("");
            setname("");
            dispatch(fetchActiveDepartments(orgId));
        };
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                
                <div>
                    <div className="filter-div">
                        <div className="input-org-filter">
                          <label>Status</label>
                              <select
                                  value={status}
                                  onChange={(e) => setstatus(e.target.value)}
                              >
                                  <option value="0">Active</option>
                                  <option value="1">In Active</option>
                              </select>
                          </div>
                          
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
                            <h4 className="check-head text-color">Departments:{FilterDepartments.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-department")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Department Name</th>
                                    <th>profile Type</th>
                                    <th>Manager Phone</th>
                                    <th>Manager Email</th>
                                    <th>Manage Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FilterDepartments.length > 0 ? (
                                    FilterDepartments.map((dep) => (
                                        <tr key={dep.id} onClick={() =>
                                            navigate(`/view-department/${dep.id}`, { state: { dep } })
                                        }>
                                            <td>{dep.name}</td>
                                            <td>{dep.profileType}</td>
                                            <td>{dep.phone}</td>
                                            <td>{dep.email}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-dep/${dep.id}`, { state: { dep } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-del"
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(dep.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Departments found</td>
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

export default ActiveDep;
