
// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Tooltip } from "react-tooltip";
// import SidebarMenu from "../Layouts/sidemenue";
// import Calendar from "react-calendar";
// import { deleteOrg, fetchActiveDepartments, fetchAllTasks, fetchTasks, fetchUsers } from "../Redux/Actions/Action";
// import axios from "axios";

// function CalendarComponent() {
//     const dispatch = useDispatch();
//     const { Tasks = [] } = useSelector((state) => state.Tasks || {});
//    const [departmentId, setdepartmentId] = useState("all");
//     const { Departments } = useSelector((state) => state.Departments);
//     const [AgentId, setAgentId] = useState("all");
//     const [date, setDate] = useState(new Date());
//     const [tasks, setTasks] = useState({});
//     const roles = sessionStorage.getItem('roles');
//     const { Users } = useSelector((state) => state.Users);
//     const [orgId, setorgId] = useState(sessionStorage.getItem("orgId"));
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [Agents, setAgents] = useState([]);
//     const [total,settotal]=useState(0)
   
//       useEffect(() => {
//           dispatch(fetchActiveDepartments(orgId));
//         //   console.log("Departments", Departments);
//           dispatch(fetchUsers());
//       }, [dispatch]);
//       useEffect(() => {
//            if (Users && Users.length > 0) {
//              const agentList = Users.filter((u) => u.role === "Agent");
//              setAgents(agentList);
//             //  console.log("Agents:", agentList);
//            }
//          }, [Users]);

//     const [currentPage, setCurrentPage] = useState(1);
//     const agentsPerPage = 5; 
//     const totalAgents = Agents?.length || 0;
//     const indexOfLastAgent = currentPage * agentsPerPage;
//     const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
//     const currentAgents = (Agents || []).slice(indexOfFirstAgent, indexOfLastAgent);

//     const paginate = (direction) => {
//         if (direction === "next" && indexOfLastAgent < totalAgents) {
//         setCurrentPage((prev) => prev + 1);
//         } else if (direction === "prev" && currentPage > 1) {
//         setCurrentPage((prev) => prev - 1);
//         }
//     };


    
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (Departments && Departments.length > 0) {
//             if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
//                 setdepartmentId("all"); 
//             }else{
//                 setdepartmentId(sessionStorage.getItem("departments"))
//             }
//         }
//     }, [Departments, roles]);
    
//     useEffect(() => {
//         // console.log("Final departmentId before fetching tasks:", departmentId);
        
//         if (departmentId) {
//             // Construct parameters dynamically
//             const selectedDepartment = departmentId !== "all" ? parseInt(departmentId,10) : "";
//             const selectedAgent = AgentId !== "all" ? AgentId : "";
//             // console.log("selectedDepartment",selectedDepartment,selectedAgent) 
    
//             dispatch(fetchAllTasks("", "", "", "", "", "", selectedAgent, "",selectedDepartment));
//         }
//     }, [dispatch, departmentId, AgentId]);
    
// useEffect(() => {
//     // console.log("Redux Tasks State Updated:", Tasks);
//     if (Tasks.length === 0) {
//         setDate(new Date()); 
//     }
// }, [Tasks]);
//     const [serviceColors, setServiceColors] = useState({});
//     const [serviceCounts, setServiceCounts] = useState({});

//     // Generate a random color for each service
//     const generateColor = () => {
//         return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//     };
    
//     useEffect(() => {

//     // Reset tasks to empty object only if really needed
//         setTasks({});

//         if (Tasks.length > 0) {
//             // console.log("Tasks from Redux:", Tasks);
    
//             const formattedTasks = Tasks.reduce((acc, task) => {
//                 if (!task.startAt) return acc; // Ensure startAt exists
    
//                 const taskDate = new Date(task.startAt);
//                 if (isNaN(taskDate.getTime())) return acc; // Ensure valid date
    
//                 const dateKey = taskDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    
//                 if (!acc[dateKey]) {
//                     acc[dateKey] = [];
//                 }
    
//                 // 🔹 **Check if task already exists before pushing**
//                 const isDuplicate = acc[dateKey].some((t) => t.id === task.id);
//                 if (!isDuplicate) {
//                     acc[dateKey].push({
//                         ...task,
//                         startTime: taskDate.toTimeString().split(" ")[0].slice(0, 5),
//                     });
//                 }
    
//                 return acc;
//             }, {});
//             // console.log("Formatted Tasks:", formattedTasks);
//             setTasks(formattedTasks);


//             const formattedDate = formatDate(date); 
//             const tasksForSelectedDate = formattedTasks[formattedDate] || []; 
//             settotal(tasksForSelectedDate.length)
//             const serviceCountMap = {};
//             const colorMap = {};
    
//             tasksForSelectedDate.forEach((task) => {
//                 if (task.serviceName) {
//                     serviceCountMap[task.serviceName] = (serviceCountMap[task.serviceName] || 0) + 1;
    
//                     if (!colorMap[task.serviceName]) {
//                         colorMap[task.serviceName] = generateColor();
//                     }
//                 }
//             });
    
//             // console.log("Service Counts for Selected Date:", serviceCountMap);
//             // console.log("Service Colors:", colorMap);
//             setServiceCounts(serviceCountMap);
//             setServiceColors(colorMap);
        
            
//         }
//     }, [Tasks, departmentId,AgentId,date]);
    
    
    
    
//       const handleDateChange = (newDate) => {
//         setDate(newDate);
//       };
    
//       const formatDate = (date) => {
//         return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
//           .toISOString()
//           .split("T")[0];
//       };
//       const dateKey = formatDate(date);

//       const renderTimeBlocks = () => {
//         const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);
//         const formattedDate = formatDate(date);
    
//         // console.log("Current Agents:", currentAgents);
//         // console.log("Tasks for Date:", formattedDate, tasks[formattedDate]);
    
//         return (
//             <div className="schedule-count">
//                 <div className="schedule-container">
                    
//                     {/* Agents Header Row */}
//                     <div className="agents-header">
//                         <div className="time-placeholder"></div> {/* Empty space for alignment */}
//                         {currentAgents.map((agent) => (
//                             <div key={agent.id} className="agent-name">
//                                 {agent.userName}
//                             </div>
//                         ))}
//                     </div>
        
//                     {/* Schedule Grid */}
//                     <div className="schedule-grid">
//                         {/* Left Column for Time Labels */}
//                         <div className="time-column">
//                             {timeSlots.map((time, index) => (
//                                 <div key={index} className="time-label">
//                                     {time}
//                                 </div>
//                             ))}
//                         </div>
        
//                         {/* Agent Columns */}
//                         {currentAgents.length > 0 ? (
//                             currentAgents.map((agent) => {
//                                 const tasksForAgent = (tasks[formattedDate] || []).filter(
//                                     (task) => task.assignedToUserName === agent.userName
//                                 );
        
//                                 return (
//                                     <div key={agent.id} className="agent-task-column">
//                                         {/* Tasks for Each Agent */}
//                                         {tasksForAgent.map((task, idx) => {
//                                             const startTime = new Date(task.startAt);
//                                             const endTime = task.dueDate
//                                                 ? new Date(task.dueDate)
//                                                 : new Date(startTime.getTime() + 60 * 60000); // Default 1-hour task
        
//                                             const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
//                                             const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
//                                             const duration = endMinutes - startMinutes;
        
//                                             const slotHeight = (duration / 60) * 50; // Convert duration to pixels
//                                             const startOffset = ((startMinutes - 8 * 60) / 60) * 50; // Adjust for 8 AM start time
        
//                                             return (
//                                                 <div
//                                                     key={task.id}
//                                                     className="task-block"
//                                                     style={{
//                                                         height: `${slotHeight}px`,
//                                                         top: `${startOffset}px`,
//                                                     }}
//                                                     onClick={() =>
//                                                         navigate(`/view-task/${task.id}`, { state: { task } })
//                                                     }
//                                                     data-tooltip-id={`task-tooltip-${task.id}`}
//                                                 >
//                                                     <span
//                                                         style={{
//                                                             display: "inline-block",
//                                                             width: "10px",
//                                                             height: "10px",
//                                                             backgroundColor: serviceColors[task.serviceName] || "#000",
//                                                             marginRight: "5px",
//                                                         }}
//                                                     ></span>
//                                                     {task.taskName}
//                                                     <Tooltip id={`task-tooltip-${task.id}`} place="top" effect="solid" style={{ backgroundColor: "#125370", zIndex:"1000" }}>
//                                                         <div>
//                                                             <strong>Title : </strong> {task.taskName} <br />
//                                                             <strong>Start Time : </strong> {task.startTime} <br />
//                                                             <strong>Assigned To : </strong> {task.assignedToUserName} <br />
//                                                             <strong>Created By : </strong> {task.createdByUserName} <br />
//                                                             <strong>Priority : </strong>{task.priorityName} <br/>
//                                                             <strong>Service : </strong>{task.serviceName}
//                                                         </div>
//                                                     </Tooltip>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <p>No agents available</p>
//                         )}
//                     </div>
        
//                     {/* Pagination Controls */}
//                     {totalAgents > agentsPerPage && (
//                         <div className="pagination-controls">
//                             <button
//                                 onClick={() => paginate("prev")}
//                                 disabled={currentPage === 1}
//                             >
//                                 ◀ 
//                             </button>
//                             <span>
//                                 Page {currentPage} of {Math.ceil(totalAgents / agentsPerPage)}
//                             </span>
//                             <button
//                                 onClick={() => paginate("next")}
//                                 disabled={indexOfLastAgent >= totalAgents}
//                             >
//                                  ▶
//                             </button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="service-counts">
                
//                 <ul>
//                     <li>Total: {total}</li>
//                     {Object.keys(serviceCounts).length === 0 ? (
//                         <li>Loading services...</li>
//                     ) : (
//                         Object.entries(serviceCounts).map(([service, count]) => (
//                             <li key={service}>
//                                 <span
//                                     style={{
//                                         display: "inline-block",
//                                         width: "10px",
//                                         height: "10px",
//                                         backgroundColor: serviceColors[service] || "#000",
//                                         marginRight: "5px",
//                                     }}
//                                 ></span>
//                                 {service}: {count} 
//                             </li>
//                         ))
//                     )}
//                 </ul>

//             </div>
//         </div>
//         );
//     };
    
    
//         return (
//         <div className="d-flex">
//             <SidebarMenu/>
//             <div className="manage mx-auto">    
//               <div> 
//                   <div className="filter-div">
                      
                  
//                   </div>
//                   <div className="calendar-schedule">

//                     <div className="filter-div">
//                         {/* <Calendar onChange={handleDateChange} value={date} className="custom-calendar"
//                         tileClassName={({ date }) => {
//                             const formattedDate = formatDate(date);
//                             return tasks[formattedDate] ? "task-date" : "";  
//                         }}/> */}
//                         <div
//                             className="date-display"
//                             onMouseEnter={() => setShowCalendar(true)}
//                             onMouseLeave={() => setShowCalendar(false)}
//                         >
//                             {date.toDateString()}
//                             {showCalendar && (
//                                 <div className="calendar-popup">
//                                     <Calendar
//                                         onChange={handleDateChange}
//                                         value={date}
//                                         className="custom-calendar"
//                                         tileClassName={({ date }) => {
//                                             const formattedDate = formatDate(date);
//                                             return tasks[formattedDate] ? "task-date" : "";  
//                                         }}/> 
//                                         <div className="calendar-legend">
//                                             <div className="legend-item">
//                                                 <span className="legend-box active-color"></span>Active Day
//                                             </div>
//                                             <div className="legend-item">
//                                                 <span className="legend-box task-color"></span> Tasks Available
//                                             </div>
//                                             <div className="legend-item">
//                                                 <span className="legend-box normal-color"></span> No Tasks
//                                             </div>
//                                         </div>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="input-org-filter">
//                           <label>Department</label>
//                           <select
//                               value={departmentId}
//                               onChange={(e) => setdepartmentId(e.target.value)}
//                           >   
//                               <option value="all">All Departments</option>
//                               {Departments && Departments.length > 0 ? (
//                               Departments.map((dep) => (
//                                   <option key={dep.id} value={dep.id}>{dep.name}</option>
//                               ))
//                               ) : (
//                               <option>No Departments available</option>
//                               )}
//                           </select>
//                       </div>
//                       <div className="input-org-filter">
//                         <label>Agents</label>
//                         <select value={AgentId} onChange={(e) => setAgentId(e.target.value)}>
//                             <option value="all">All Agents</option>
//                             {Agents?.length > 0 ? (
//                             Agents.map((a) => (
//                                 <option key={a.id} value={a.id}>
//                                 {a.userName}
//                                 </option>
//                             ))
//                             ) : (
//                             <option disabled>No Agents available</option>
//                             )}
//                         </select>
//                     </div>
//                     <button
//                                 onClick={() => navigate("/add-task")}
//                                 className="filter-btn" 
//                                 icon={faPlus}
//                             >Add</button>
                        
//                     </div>
//                     <div className="schedule">
//                         {renderTimeBlocks()}
//                     </div>
                      
//                   </div>
                  
                   
//                 </div>
//                 <ToastContainer />
//             </div>
//         </div>
//     );

// }



// export default CalendarComponent;


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
import { deleteOrg, fetchActiveDepartments, fetchAllTasks, fetchTasks, fetchUsers } from "../Redux/Actions/Action";
import axios from "axios";

function CalendarComponent() {
    const dispatch = useDispatch();
    const { Tasks = [] } = useSelector((state) => state.Tasks || {});
   const [departmentId, setdepartmentId] = useState("all");
    const { Departments } = useSelector((state) => state.Departments);
    const [AgentId, setAgentId] = useState("all");
    const [date, setDate] = useState(new Date());
    const [tasks, setTasks] = useState({});
    const roles = sessionStorage.getItem('roles');
    const { Users } = useSelector((state) => state.Users);
    const [orgId, setorgId] = useState(sessionStorage.getItem("orgId"));
    const [showCalendar, setShowCalendar] = useState(false);
    const [Agents, setAgents] = useState([]);
    const [total,settotal]=useState(0)
   
      useEffect(() => {
          dispatch(fetchActiveDepartments(orgId));
        //   console.log("Departments", Departments);
          dispatch(fetchUsers());
      }, [dispatch]);
      useEffect(() => {
           if (Users && Users.length > 0) {
             const agentList = Users.filter((u) => u.role === "Agent");
             setAgents(agentList);
            //  console.log("Agents:", agentList);
           }
         }, [Users]);

    const [currentPage, setCurrentPage] = useState(1);
    const agentsPerPage = 5; 
    const totalAgents = Agents?.length || 0;
    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = (Agents || []).slice(indexOfFirstAgent, indexOfLastAgent);

    const paginate = (direction) => {
        if (direction === "next" && indexOfLastAgent < totalAgents) {
        setCurrentPage((prev) => prev + 1);
        } else if (direction === "prev" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        }
    };


    
    const navigate = useNavigate();
    useEffect(() => {
        if (Departments && Departments.length > 0) {
            if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
                setdepartmentId("all"); 
            }else{
                setdepartmentId(sessionStorage.getItem("departments"))
            }
        }
    }, [Departments, roles]);
    
    useEffect(() => {
        // console.log("Final departmentId before fetching tasks:", departmentId);
        
        if (departmentId) {
            // Construct parameters dynamically
            const selectedDepartment = departmentId !== "all" ? parseInt(departmentId,10) : "";
            const selectedAgent = AgentId !== "all" ? AgentId : "";
            // console.log("selectedDepartment",selectedDepartment,selectedAgent) 
    
            dispatch(fetchAllTasks("", "", "", "", "", "", selectedAgent, "",selectedDepartment));
        }
    }, [dispatch, departmentId, AgentId]);
    
useEffect(() => {
    // console.log("Redux Tasks State Updated:", Tasks);
    if (Tasks.length === 0) {
        setDate(new Date()); 
    }
}, [Tasks]);
    const [serviceColors, setServiceColors] = useState({});
    const [serviceCounts, setServiceCounts] = useState({});

    // Generate a random color for each service
    const generateColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };
    useEffect(() => {
        if (departmentId) {
            const selectedDepartment = departmentId !== "all" ? parseInt(departmentId, 10) : "";
            const selectedAgent = AgentId !== "all" ? AgentId : "";
            dispatch(fetchAllTasks("", "", "", "", "", "", selectedAgent, "", selectedDepartment));
        }
    }, [dispatch, departmentId, AgentId]);

    useEffect(() => {
        if (Tasks.length > 0) {
            setTasks({});
            const formattedTasks = Tasks.reduce((acc, task) => {
                if (!task.startAt) return acc;
            
                const taskStartDate = new Date(task.startAt);
                const taskEndDate = task.dueDate ? new Date(task.dueDate) : taskStartDate;
            
                if (isNaN(taskStartDate.getTime()) || isNaN(taskEndDate.getTime())) return acc;
            
                let currentDate = new Date(taskStartDate);
            
                while (currentDate <= taskEndDate) {
                    const dateKey = currentDate.toISOString().split("T")[0];
            
                    if (!acc[dateKey]) acc[dateKey] = [];
                    if (!acc[dateKey].some((t) => t.id === task.id)) {
                        acc[dateKey].push({
                            ...task,
                            startTime: taskStartDate.toTimeString().split(" ")[0].slice(0, 5),
                        });
                    }
            
                    // Move to the next day
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            
                return acc;
            }, {});
            

            setTasks(formattedTasks);
            console.log(formattedTasks)

            const formattedDate = formatDate(date);
            const tasksForSelectedDate = formattedTasks[formattedDate] || [];
            settotal(tasksForSelectedDate.length);

            const serviceCountMap = {};
            const colorMap = {};

            tasksForSelectedDate.forEach((task) => {
                if (task.serviceName) {
                    serviceCountMap[task.serviceName] = (serviceCountMap[task.serviceName] || 0) + 1;
                    if (!colorMap[task.serviceName]) {
                        colorMap[task.serviceName] = generateColor();
                    }
                }
            });

            setServiceCounts(serviceCountMap);
            setServiceColors(colorMap);
        }
    }, [Tasks, departmentId, AgentId, date]);

    // const generateColor = () => {
    //     const letters = "0123456789ABCDEF";
    //     let color = "#";
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // };

    
    
    
    
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
        const formattedDate = formatDate(date);
    
        // console.log("Current Agents:", currentAgents);
        // console.log("Tasks for Date:", formattedDate, tasks[formattedDate]);
    
        return (
            <div className="schedule-count">
                <div className="schedule-container">
                    
                    {/* Agents Header Row */}
                    <div className="agents-header">
                        <div className="time-placeholder"></div> {/* Empty space for alignment */}
                        {currentAgents.map((agent) => (
                            <div key={agent.id} className="agent-name">
                                {agent.userName}
                            </div>
                        ))}
                    </div>
        
                    {/* Schedule Grid */}
                    <div className="schedule-grid">
                        {/* Left Column for Time Labels */}
                        <div className="time-column">
                            {timeSlots.map((time, index) => (
                                <div key={index} className="time-label">
                                    {time}
                                </div>
                            ))}
                        </div>
        
                        {/* Agent Columns */}
                        {currentAgents.length > 0 ? (
                            currentAgents.map((agent) => {
                                const tasksForAgent = (tasks[formattedDate] || []).filter(
                                    (task) => task.assignedToUserName === agent.userName
                                );
        
                                return (
                                    <div key={agent.id} className="agent-task-column">
                                        {/* Tasks for Each Agent */}
                                        {tasksForAgent.map((task, idx) => {
                                            const taskStartDate = new Date(task.startAt);
                                            const taskEndDate = task.dueDate ? new Date(task.dueDate) : new Date(taskStartDate.getTime() + 60 * 60000);
                                            
                                            const selectedDateString = formatDate(date); // Selected calendar date
                                            const taskStartString = formatDate(taskStartDate); // Task start date
                                            const taskEndString = formatDate(taskEndDate); // Task end date
                                        
                                            let startMinutes, endMinutes;
                                        
                                            // If the task starts **before** the selected day, start at 8 AM
                                            if (taskStartString < selectedDateString) {
                                                startMinutes = 8 * 60; // 8:00 AM
                                            } else {
                                                startMinutes = taskStartDate.getHours() * 60 + taskStartDate.getMinutes();
                                            }
                                        
                                            // If the task ends **after** the selected day, default end time to last slot
                                            if (taskEndString > selectedDateString) {
                                                endMinutes = 20 * 60; // 8:00 PM (assuming 12-hour schedule)
                                            } else {
                                                endMinutes = taskEndDate.getHours() * 60 + taskEndDate.getMinutes();
                                            }
                                        
                                            const duration = endMinutes - startMinutes;
                                            const slotHeight = (duration / 60) * 50; // Convert duration to pixels
                                            const startOffset = ((startMinutes - 8 * 60) / 60) * 50; // Adjust for 8 AM start time
                                        
                                            return (
                                                <div
                                                    key={task.id}
                                                    className="task-block"
                                                    style={{
                                                        height: `${slotHeight}px`,
                                                        top: `${startOffset}px`,
                                                    }}
                                                    onClick={() =>
                                                        navigate(`/view-task/${task.id}`, { state: { task } })
                                                    }
                                                    data-tooltip-id={`task-tooltip-${task.id}`}
                                                >
                                                    <span
                                                        style={{
                                                            display: "inline-block",
                                                            width: "10px",
                                                            height: "10px",
                                                            backgroundColor: serviceColors[task.serviceName] || "#000",
                                                            marginRight: "5px",
                                                        }}
                                                    ></span>
                                                    {task.taskName}
                                                    <Tooltip id={`task-tooltip-${task.id}`} place="top" effect="solid" style={{ backgroundColor: "#125370", zIndex:"1000" }}>
                                                        <div>
                                                            <strong>Title : </strong> {task.taskName} <br />
                                                            <strong>Start Time : </strong> {task.startTime} <br />
                                                            <strong>Assigned To : </strong> {task.assignedToUserName} <br />
                                                            <strong>Created By : </strong> {task.createdByUserName} <br />
                                                            <strong>Priority : </strong>{task.priorityName} <br/>
                                                            <strong>Service : </strong>{task.serviceName}
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })
                        ) : (
                            <p>No agents available</p>
                        )}
                    </div>
        
                    {/* Pagination Controls */}
                    {totalAgents > agentsPerPage && (
                        <div className="pagination-controls">
                            <button
                                onClick={() => paginate("prev")}
                                disabled={currentPage === 1}
                            >
                                ◀ 
                            </button>
                            <span>
                                Page {currentPage} of {Math.ceil(totalAgents / agentsPerPage)}
                            </span>
                            <button
                                onClick={() => paginate("next")}
                                disabled={indexOfLastAgent >= totalAgents}
                            >
                                 ▶
                            </button>
                        </div>
                    )}
                </div>
                <div className="service-counts">
                
                <ul>
                    <li>Total: {total}</li>
                    {Object.keys(serviceCounts).length === 0 ? (
                        <li>Loading services...</li>
                    ) : (
                        Object.entries(serviceCounts).map(([service, count]) => (
                            <li key={service}>
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: serviceColors[service] || "#000",
                                        marginRight: "5px",
                                    }}
                                ></span>
                                {service}: {count} 
                            </li>
                        ))
                    )}
                </ul>

            </div>
        </div>
        );
    };
    
    
        return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">    
              <div> 
                  <div className="filter-div">
                      
                  
                  </div>
                  <div className="calendar-schedule">

                    <div className="filter-div">
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
                        <div className="input-org-filter">
                          <label>Department</label>
                          <select
                              value={departmentId}
                              onChange={(e) => setdepartmentId(e.target.value)}
                          >   
                              <option value="all">All Departments</option>
                              {Departments && Departments.length > 0 ? (
                              Departments.map((dep) => (
                                  <option key={dep.id} value={dep.id}>{dep.name}</option>
                              ))
                              ) : (
                              <option>No Departments available</option>
                              )}
                          </select>
                      </div>
                      <div className="input-org-filter">
                        <label>Agents</label>
                        <select value={AgentId} onChange={(e) => setAgentId(e.target.value)}>
                            <option value="all">All Agents</option>
                            {Agents?.length > 0 ? (
                            Agents.map((a) => (
                                <option key={a.id} value={a.id}>
                                {a.userName}
                                </option>
                            ))
                            ) : (
                            <option disabled>No Agents available</option>
                            )}
                        </select>
                    </div>
                    <button
                                onClick={() => navigate("/add-task")}
                                className="filter-btn" 
                                icon={faPlus}
                            >Add</button>
                        
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

