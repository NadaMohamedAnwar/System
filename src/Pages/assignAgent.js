import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addATask, assignTaskToAgent, assignTaskToParent, fetchActiveDepartments, fetchClients, fetchTasks, fetchUsers, filterServices } from "../Redux/Actions/Action";
import axios from "axios";

function AssignAgent() {
  const [Agentloading, setAgentloading] = useState(false); 
  const [taskId, settaskId] = useState("");
  const { Tasks } = useSelector((state) => state.Tasks);
  const { Users } = useSelector((state) => state.Users);
  const [AgentId, setAgentId] = useState("");
  const [Agents, setAgents] = useState([]);
  const [departmentId, setDepartmentId] = useState(localStorage.getItem('departments'));
  const { Departments } = useSelector((state) => state.Departments);
   const roles = localStorage.getItem('roles');
   const depids = localStorage.getItem('departments');
   const [headDeps, setHeadDeps] = useState([]);
   const dispatch = useDispatch();
   
   useEffect(() => {
         dispatch(fetchActiveDepartments());
     }, [dispatch]);
    
    useEffect(() => {
            if (Departments && Departments.length > 0) {
                if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
                    setDepartmentId(""); 
                }else{
                    setDepartmentId(localStorage.getItem("departments"))
                }
            }
        }, [Departments, roles]);
   
     useEffect(() => {
         if (departmentId) {
                dispatch(fetchTasks(departmentId));
            }
    }, [dispatch,departmentId]);
 
   useEffect(() => {
     if (Users && Users.length > 0) {
       const agentList = Users.filter((u) => u.role.includes("Agent") && u.departmentIds.includes(parseInt(departmentId)));
       setAgents(agentList);
      //  console.log("Agents:", agentList);
     }
   }, [Users,departmentId]);


  const handleAssignAgent = async () => {
    setAgentloading(true);
    try {
        // console.log(taskId,"======",AgentId)
      await dispatch(assignTaskToAgent(parseInt(taskId,10),AgentId));
      toast.success("Task Assigned successfully!");
     
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setAgentloading(false); 
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
        <div className="org-par col-sm-12 col-md-8 col-lg-6">
                <h5 className="text-color">Assign Agent</h5>
                {(roles.includes("OrgAdmin")||roles.includes("HeadManager"))&&<div className="input-org-filter">
                            <label>Department</label>
                            <select
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
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
                        
                <div className="input-org">
                  <label>Parent Task</label>
                  <select
                  value={taskId}
                  onChange={(e) => settaskId(e.target.value)}
                >
                <option value="">Select Task</option>
                 {Tasks && Tasks.length > 0 ? (
                    Tasks.map((Task) => (
                        <option key={Task.id} value={Task.id}>{Task.title}</option>
                    ))
                    ) : (
                    <option>No Tasks available</option>
                    )}
                </select>
                </div>
                <div className="input-org">
                  <label>Agents</label>
                  <select value={AgentId} onChange={(e) => setAgentId(e.target.value)}>
                    <option value="">Select a Agent</option>
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

                <button className="loading-buttons"  onClick={handleAssignAgent} style={{ marginTop: "20px", width: "100%" }} disabled={Agentloading}>
                {Agentloading ? (
                <span className="loader"></span> 
              ) : (
                'Assign Agent'
              )}</button>
            
            </div>

        <ToastContainer />
    </div>
  );
}

export default AssignAgent;
