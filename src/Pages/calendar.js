import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import SidebarMenu from "../Layouts/sidemenue";
import Calendar from "react-calendar";
import { deleteOrg, fetchActiveDepartments, fetchTasks, fetchUsers } from "../Redux/Actions/Action";
import axios from "axios";

function CalendarComponent() {
    const dispatch = useDispatch();
    const { Tasks = [] } = useSelector((state) => state.Tasks || {});
   const [departmentId, setdepartmentId] = useState(sessionStorage.getItem('departments'));
    const { Departments } = useSelector((state) => state.Departments);
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState({});
    const roles = sessionStorage.getItem('roles');
    const { Users } = useSelector((state) => state.Users);
    const [orgId, setorgId] = useState(sessionStorage.getItem("orgId"));
    const [showCalendar, setShowCalendar] = useState(false);

      useEffect(() => {
          dispatch(fetchActiveDepartments(orgId));
          console.log("Departments", Departments);
          dispatch(fetchUsers());
      }, [dispatch]);
      
    const navigate = useNavigate();
    useEffect(() => {
        if (Departments && Departments.length > 0) {
            if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
                setdepartmentId(Departments[0]?.id); 
            }
        }
    }, [Departments, roles]);
    
useEffect(() => {
    console.log("Final departmentId before fetching tasks:", departmentId);
    if (departmentId) {
        console.log(`http://agentsys.runasp.net/api/Departments/${departmentId}/Tasks`)
        dispatch(fetchTasks(departmentId));
       
    }
}, [dispatch,departmentId]);
useEffect(() => {
    console.log("Redux Tasks State Updated:", Tasks);
    if (Tasks.length === 0) {
        setDate(new Date()); 
    }
}, [Tasks]);

    const handleDelete = (Id) => {
        if (window.confirm("Are you sure you want to delete this Task?")) {
            dispatch(deleteOrg(Id))
                .then(() => toast.success("Task deleted successfully"))
                .catch((err) => toast.error("Failed to delete Task: " + err.message));
        }
    };
    useEffect(() => {
        setTasks({});  
        if (Tasks.length > 0) {
            console.log("Tasks", Tasks);
            const formattedTasks = Tasks.reduce((acc, task) => {
                if (!task.dueDate) return acc;
    
                const taskDate = new Date(task.dueDate);
                const taskTime = taskDate.toTimeString().split(" ")[0].slice(0, 5); 
    
                if (isNaN(taskDate.getTime())) return acc; 
    
                const dateKey = taskDate.toISOString().split("T")[0];
    
                const agent = Users.find((u) => u.id === task.assignedTo);
                
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
    
                acc[dateKey].push({
                    ...task,
                    Agent: agent ? agent.userName : "Unknown",
                    startTime: taskTime, 
                });
    
                return acc;
            }, {});
            console.log("formattedTasks",formattedTasks)
            setTasks(formattedTasks);
          
        }
    }, [Tasks, departmentId]);
    
    
      const handleDateChange = (newDate) => {
        setDate(newDate);
      };
    
      const formatDate = (date) => {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];
      };
      const dateKey = formatDate(date);

      const renderTimeBlocks = () => {
        const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
        const formattedDate = formatDate(date); // Ensure correct key format
        const dayTasks = tasks[formattedDate] || []; // Match date correctly
    
        return timeSlots.map((time, index) => {
            const hour = 8 + index; // Start at 8 AM
            const tasksAtThisTime = dayTasks.filter((task) => {
                const taskStartHour = parseInt(task.startTime.split(':')[0]);
                return taskStartHour === hour; // Ensure exact match
            });
    
            return (
                <div key={index} className="time-slot">
                    <div className="time-label">{time}</div>
                    {tasksAtThisTime.map((task, idx) => (
                        <div key={idx} className="task-block" data-tooltip-id={`task-tooltip-${idx}`}>
                            {task.title}
                            <Tooltip id={`task-tooltip-${idx}`} place="top" effect="solid">
                            <div>
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Start Time:</strong> {task.startTime} <br />
                                <strong>Assigned To:</strong> {task.Agent} <br />
                                <strong>Description:</strong> {task.description || "No Description"}
                            </div>
                        </Tooltip>
                        </div>
                    ))}
                </div>
            );
        });
    };
    
    
      
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">    
              <div> 
                  <div className="filter-div">
                      {(roles.includes("OrgAdmin")||roles.includes("HeadManager"))&&<div className="input-org-filter">
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
                  
                  </div>
                  <div className="calendar-schedule">

                    <div>
                        {/* <Calendar onChange={handleDateChange} value={date} className="custom-calendar"
                        tileClassName={({ date }) => {
                            const formattedDate = formatDate(date);
                            return tasks[formattedDate] ? "task-date" : "";  
                        }}/> */}
                        <div
                            className="date-display"
                            onMouseEnter={() => setShowCalendar(true)}
                            onMouseLeave={() => setShowCalendar(false)}
                        >
                            {date.toDateString()}
                            {showCalendar && (
                                <div className="calendar-popup">
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={date}
                                        className="custom-calendar"
                                        tileClassName={({ date }) => {
                                            const formattedDate = formatDate(date);
                                            return tasks[formattedDate] ? "task-date" : "";  
                                        }}/> 
                                        <div className="calendar-legend">
                                            <div className="legend-item">
                                                <span className="legend-box active-color"></span>Active Day
                                            </div>
                                            <div className="legend-item">
                                                <span className="legend-box task-color"></span> Tasks Available
                                            </div>
                                            <div className="legend-item">
                                                <span className="legend-box normal-color"></span> No Tasks
                                            </div>
                                        </div>
                                    </div>
                            )}
                        </div>
                        
                    </div>
                    <div className="schedule">
                        {renderTimeBlocks()}
                    </div>
                      
                  </div>
                  
                   
                </div>
                <ToastContainer />
            </div>
        </div>
    );

}



export default CalendarComponent;
