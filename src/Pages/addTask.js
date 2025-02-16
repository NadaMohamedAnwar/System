import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addATask, assignTaskToAgent, assignTaskToParent, fetchActiveDepartments, fetchCases, fetchClients, fetchTasks, fetchUsers, filterServices } from "../Redux/Actions/Action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [serviceId, setServiceId] = useState("");
  const [taskTypeId, setTaskTypeId] = useState("");
  const [taskTypes, setTaskTypes] = useState([]);
  const [departmentId, setDepartmentId] = useState(sessionStorage.getItem('departments'));
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskId, settaskId] = useState("");
  const navigate = useNavigate();
  const [parenttaskId, setparenttaskId] = useState("");
  const { Tasks } = useSelector((state) => state.Tasks);
  const { Users } = useSelector((state) => state.Users);
  const [AgentId, setAgentId] = useState("");
  const [Agents, setAgents] = useState([]);
  const roles = sessionStorage.getItem('roles');
  const dispatch = useDispatch();
  const orgId=parseInt(sessionStorage.getItem("orgId"), 10)

  const { Cases } = useSelector((state) => state.Cases);
  const [CaseId, setCaseId] = useState(null);
  useEffect(() => {
          dispatch(fetchCases());
             
     }, [dispatch]);



  if(departmentId){
    console.log("departmentId",departmentId)
  }
  useEffect(() => {
          if (departmentId) {
              dispatch(fetchTasks(departmentId));
          }
          dispatch(fetchUsers());
      }, [dispatch, departmentId]);
      
   useEffect(() => {
     if (Users && Users.length > 0) {
       const agentList = Users.filter((u) => u.role === "Agent");
       setAgents(agentList);
       console.log("Agents:", agentList);
     }
   }, [Users]);
  const { filteredServices } = useSelector((state) => state.Services); 
  const [errors, setErrors] = useState({});

  
  const { Departments } = useSelector((state) => state.Departments);

  const [currentSection, setCurrentSection] = useState(0);
  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 4); 
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 4) % 4); 
  };

  
  useEffect(() => {
    dispatch(fetchActiveDepartments(orgId));
    console.log("Departments", Departments);
}, [dispatch]);

    const userRoles=sessionStorage.getItem("roles")
    const { Clients } = useSelector((state) => state.Clients);
     const[clients,setclients]=useState([])
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

  useEffect(() => {
    console.log("filteredServices after dispatch:", filteredServices);
  }, [filteredServices]);

  useEffect(() => {
    // if (departmentId && Departments && Departments.length > 0) {
    //   console.log(Departments)
    //   const selectedDepartment = Departments.find(
    //     (dep) => dep.id.toString() === departmentId
    //   );
  
    //   if (selectedDepartment?.id) {
        dispatch(filterServices(departmentId));
        console.log("filteredServices",filteredServices)
      // }
    // }
  }, [departmentId, Departments, dispatch]);
  
      
  useEffect(() => {
    FetchTaskTypes()
}, [serviceId]);
  
const FetchTaskTypes=async()=>{
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`http://agentsys.runasp.net/api/Service/${serviceId}/tasks`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("types",response.data)
     setTaskTypes(response.data.taskTypes)
  } catch (error) {
    console.error(error);
  }
 
}
  const validateInputs = () => {
    let newErrors = {};
    if (!parseInt(taskTypeId, 10)) newErrors.taskTypeId = "Task Type ID is required.";
    if (!parseInt(serviceId, 10)) newErrors.serviceId = "Service ID is required.";
    if (!parseInt(clientId, 10)) newErrors.clientId = "Client ID is required.";
    if (!departmentId) newErrors.departmentId = "Department ID is required.";
    if (!title || title.length > 50)
      newErrors.title = "Title is required and must be less than 50 characters.";
    if (!dueDate) newErrors.dueDate = "Due Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (exist) => {
    if (!validateInputs()) {
      console.log("Errors found:", errors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const taskData = {
      serviceId,
      taskTypeId: parseInt(taskTypeId),
      departmentId: parseInt(departmentId),
      clientId: parseInt(clientId),
      title,
      description,
      priority: parseInt(priority,10),
      dueDate,
      caseId:parseInt(CaseId,10)
    };

    try {
      console.log(taskData)
      const newTask =await dispatch(addATask(taskData));
      settaskId(newTask.id)
      toast.success("Task added successfully!");
      setServiceId("");
      setTaskTypeId("");
      setDepartmentId("");
      setClientId("");
      setTitle("");
      setDescription("");
      setPriority("");
      setDueDate("");
      setErrors({});
      if(exist==1){
        navigate(-1)
      }else{
        setCurrentSection(3);
      }
     
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleAssignAgent = async () => {
    
    try {
      await dispatch(assignTaskToAgent(taskId,AgentId));
      setCurrentSection(0);
      toast.success("Task Assigned successfully!");
     
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  // const handleAssignParent = async () => {


  //   try {
  //     await dispatch(assignTaskToParent(taskId,parenttaskId));
  //     toast.success("Task Assigned successfully!");
      
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add New Task</h3>
        <div className="stage-indicator">
          <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
            <span>1</span>
            <p>Details</p>
          </div>
          <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
            <span>2</span>
            <p>Info</p>
          </div>
          <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
            <span>3</span>
            <p>Time</p>
          </div>
          <div className={`stage-item ${currentSection === 3 ? "active" : ""}`}>
            <span>4</span>
            <p>Assign Agent</p>
          </div>
          {/* <div className={`stage-item ${currentSection === 4 ? "active" : ""}`}>
            <span>5</span>
            <p>Assign Parent</p>
          </div> */}
        </div>

        {/* Section 1: Dropdown Menus */}
        {currentSection === 0 && (
          <div className="org-data-div">
            <h5 className="text-color">Task Details</h5>
            {roles.includes("OrgAdmin")&&<div className="input-org">
              <label>Department ID</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              ><option value="">Select Department</option>
                {Departments && Departments.length > 0 ? (
                  Departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                  ))
                ) : (
                  <option>No Departments available</option>
                )}
              </select>
              {errors.departmentId && (
                <small className="error" style={{ color: "red" }}>
                  {errors.departmentId}
                </small>
              )}
            </div>}
            <div className="input-org">
              <label>Service</label>
              <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                <option value="">Select Service</option>
                {filteredServices && filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))
                ) : (
                  <option>No Services available</option>
                )}
              </select>
              {errors.serviceId && (
                <small className="error" style={{ color: "red" }}>
                  {errors.serviceId}
                </small>
              )}
            </div>
           {serviceId==="1407d97e-9763-4f95-81ca-7859de98a186"&& <div className="input-org">
                  <label>Case</label>
                  <select
                  value={CaseId}
                  onChange={(e) => setCaseId(e.target.value)}
                >
                 <option value="">Select Case</option>
                 {Cases && Cases.length > 0 ? (
                    Cases.map((Case) => (
                        <option key={Case.id} value={Case.id}>{Case.title}</option>
                    ))
                    ) : (
                    <option>No Cases available</option>
                    )}
                </select>
                </div>}
            <div className="input-org">
              <label>Task Type ID</label>
              <select
                value={taskTypeId}
                onChange={(e) => setTaskTypeId(e.target.value)}
              >
                {taskTypes && taskTypes.length > 0 ? (
                  taskTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))
                ) : (
                  <option>No Types available</option>
                )}
              </select>
              
            </div>
            
            <div className="input-org">
              <label>Client ID</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {clients && clients.length > 0 ? (
                  clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.contactName}</option>
                  ))
                ) : (
                  <option>No Clients available</option>
                )}
              </select>
              {errors.clientId && (
                <small className="error" style={{ color: "red" }}>
                  {errors.clientId}
                </small>
              )}
            </div>
          </div>
        )}

        {/* Section 2: Other Fields */}
        {currentSection === 1 && (
          <div className="org-data-div">
            <h5 className="text-color">Task Info</h5>
            <div className="input-org">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
              {errors.title && (
                <small className="error" style={{ color: "red" }}>
                  {errors.title}
                </small>
              )}
            </div>
            <div className="input-org">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </div>
          </div>
        )}
        {currentSection === 2 && (
            <div className="org-data-div">
                <h5 className="text-color">Task Time</h5>

                <div className="input-org">
                <label>Priority</label>
                <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select Task  Priority</option>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>
                </div>

                <div className="input-org">
                <label>Due Date</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                {errors.dueDate && (
                <small className="error" style={{ color: "red" }}>
                    {errors.dueDate}
                </small>
                )}
                </div>

                <button onClick={() =>handleSubmit(1)} style={{ marginTop: "20px", width: "100%" }}>
                Save and Exit
                </button>
                <button onClick={() =>handleSubmit(2)} style={{ marginTop: "20px", width: "100%" }}>
                Save and Continue
                </button>
            </div>
       )}
       {currentSection === 3 && (
            <div className="org-data-div">
                <h5 className="text-color">Assign Agent</h5>
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

                <button onClick={handleAssignAgent} style={{ marginTop: "20px", width: "100%" }}>
                Assign Agent
                </button>
            </div>
       )}

        {/* {currentSection === 4 && (
            <div className="org-data-div">
                <h5 className="text-color">Assign Parent</h5>
                <div className="input-org">
                  <label>Parent Task</label>
                  <select
                  value={parenttaskId}
                  onChange={(e) => setparenttaskId(e.target.value)}
                ><option value="">Select Task</option>
                 {Tasks && Tasks.length > 0 ? (
                    Tasks.map((Task) => (
                        <option key={Task.id} value={Task.id}>{Task.title}</option>
                    ))
                    ) : (
                    <option>No Tasks available</option>
                    )}
                </select>
                </div>

                <button onClick={handleAssignParent} style={{ marginTop: "20px", width: "100%" }}>
                Assign Parent
                </button>
            </div>
       )} */}


        {/* Navigation Buttons */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default AddTask;
