import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import Calendar from "react-calendar";
import { deleteOrg, fetchActiveDepartments, fetchAllTasks, fetchTasks, fetchUsers, filterTasks } from "../Redux/Actions/Action";
import axios from "axios";

function TaskManagement() {
    const dispatch = useDispatch();
    const { FilterTasks = [] } = useSelector((state) => state.Tasks || {});
    const [departmentId, setdepartmentId] = useState(sessionStorage.getItem('departments'));
    const { Departments } = useSelector((state) => state.Departments);
    const [name, setname] = useState("");
    const [agent, setagent] = useState("");
    const [sDate, setsDate] = useState("");
    const [eDate, seteDate] = useState("");
    const [priority, setPriority] = useState("");
    const roles = sessionStorage.getItem('roles');
    const { Users } = useSelector((state) => state.Users);
    const [total, setTotal] = useState();
    const [orgId, setorgId] = useState(sessionStorage.getItem("orgId"));
      useEffect(() => {
          dispatch(fetchActiveDepartments(orgId));
          dispatch(fetchUsers());
      }, [dispatch]);

       const getAgentName=(id)=>{
        if(Users){
            const agent = Users.find((u) => u.id == id);
            // console.log(agent)
        return agent ? agent.userName : "Unknown"
        }
       }
    const navigate = useNavigate();
   useEffect(() => {
    if (Departments && Departments.length > 0) {
        if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
            setdepartmentId(Departments[0]?.id); 
        }
    }
}, [Departments, roles]);


useEffect(() => {
   console.log(FilterTasks)
}, [FilterTasks]);

    
    
useEffect(() => {
    if (departmentId) {
        dispatch(fetchAllTasks("", "", "", "", "", "", "", "",departmentId));
        if (FilterTasks) {
            setTotal(FilterTasks.length);
        }
        
    }
}, [dispatch,departmentId]);
//   useEffect(() => {
//          dispatch(fetchTasks(departmentId));
//      }, [dispatch]); 
     
     const handleFilter = () => {
         dispatch(filterTasks(name,parseInt(priority,10),agent,sDate,eDate));
     };
     const resetData=()=>{
        // console.log(FilterTasks)
       
        setsDate("")
        setname("")
        setPriority("") 
        seteDate("")
        setagent("")
        dispatch(fetchAllTasks("", "", "", "", "", "", "", "",departmentId));
     }
     // Call handleFilter on input change
     const handleNameChange = (e) => {
         setname(e.target.value);
       
     };
     const handleAgentChange = (e) => {
        setagent(e.target.value);
      
    };
     const handleDateChange = (e) => {
        setsDate(e.target.value);
        
    };
    const handleEndDateChange = (e) => {
        seteDate(e.target.value);
        
    };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
         
    };
     
    //  useEffect(() => {
    //      handleFilter();
    //  }, [name,sDate, priority]); 

    const handleDelete = (Id) => {
        if (window.confirm("Are you sure you want to delete this Task?")) {
            dispatch(deleteOrg(Id))
                .then(() => toast.success("Task deleted successfully"))
                .catch((err) => toast.error("Failed to delete Task: " + err.message));
        }
    };
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                <div>
                    <div className="filter-div">
                        {(roles.includes("OrgAdmin") ||roles.includes("HeadManager"))&&<div className="input-org-filter">
                            <label>Department</label>
                            <select
                                value={departmentId}
                                onChange={(e) => setdepartmentId(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                {Departments && Departments.length > 0 ? (
                                Departments.map((dep) => (
                                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                                ))
                                ) : (
                                <option>No Departments available</option>
                                )}
                            </select>
                        </div>
                        }
                       
                        <div className="input-org-filter">
                            <label>Task Title</label>
                            <input 
                            type="text"
                            placeholder="Enter Task Title"
                            value={name}
                            onChange={handleNameChange}  
                            />
                        </div>
                        <div className="input-org-filter">
                            <label>Priority</label>
                            <select
                            value={priority}
                            onChange={handlePriorityChange}
                        >
                            <option value="">Select Task  Priority</option>
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                        </select>
                        </div>
                        <div className="input-org-filter">
                            <label>Agent</label>
                            <input 
                            type="text"
                            placeholder="Enter Agent Name"
                            value={agent}
                            onChange={handleAgentChange}  
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
                            <label>End Date</label>
                            <input 
                            type="date"
                            placeholder="Enter Start Date"
                            value={eDate}
                            onChange={handleEndDateChange}
                            />
                        </div>
                        
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    
                    </div>
                    <div className="table-container">

                    
                        <div className="head-icon">
                            <h4 className="check-head text-color">Tasks:   {FilterTasks.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-task")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Priority</th>
                                    {/* <th>Status</th> */}
                                    <th>Agent</th>
                                    <th>Start At</th>
                                    <th>Due Date</th>
                                    {/* <th>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {FilterTasks? (
                                    FilterTasks.map((task) => (
                                        <tr key={task.id} onClick={() =>
                                            navigate(`/view-task/${task.id}`, { state: { task } })
                                        }>
                                            <td>{task.taskName}</td>
                                            <td>{task.priorityName}</td>
                                            {/* <td>{task.statusName}</td> */}
                                            <td>{task.assignedToUserName}</td>
                                            <td>{task.startAt}</td>
                                            <td>{task.dueDate}</td>
                                            {/* <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`edit-task/${Task.id}`, { state: { Task } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-del"
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(Task.id)}
                                                />
                                            </td> */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Tasks found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                </div>   
                
                
                
            </div>
            <ToastContainer />
        
        </div>
    );
}

export default TaskManagement;
