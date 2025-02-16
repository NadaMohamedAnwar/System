import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addATask, assignCaseToParent, assignTaskToAgent, assignTaskToParent, fetchActiveDepartments, fetchCases, fetchClients, fetchTasks, fetchUsers, filterServices } from "../Redux/Actions/Action";
import axios from "axios";

function AssignParent() {
 
  const { Cases } = useSelector((state) => state.Cases);
  const [CaseId, setCaseId] = useState("");
  const [linkedCaseId, setlinkedCaseId] = useState("");
  const dispatch = useDispatch();
  
//   useEffect(() => {
//         dispatch(fetchActiveDepartments());
//     }, [dispatch]);
//      useEffect(() => {
//         if (Departments && Departments.length > 0) {
//             if (roles.includes("OrgAdmin") || roles.includes("HeadManager")) {
//                 setDepartmentId(Departments[0]?.id); 
//             }
//         }
//     }, [Departments, roles]);
    useEffect(() => {
        dispatch(fetchCases());
           
   }, [dispatch]);
 const handleAssignParent = async () => {
 
     try {
       await dispatch(assignCaseToParent(CaseId,linkedCaseId));
       toast.success("Task Assigned successfully!");
       
     } catch (error) {
       toast.error("An error occurred. Please try again.");
     }
   };

  return (
    <div className="d-flex">
      <SidebarMenu />
        <div className="org-par col-sm-12 col-md-8 col-lg-6">
                <h5 className="text-color">Assign Revelant</h5>
                {/* {(roles.includes("OrgAdmin") ||roles.includes("HeadManager"))&&<div className="input-org-filter">
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
                        } */}
                        
                <div className="input-org">
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
                </div>
                <div className="input-org">
                  <label>Revelant Case</label>
                  <select
                  value={linkedCaseId}
                  onChange={(e) => setlinkedCaseId(e.target.value)}
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
                </div>

                <button onClick={handleAssignParent} style={{ marginTop: "20px", width: "100%" }}>
                Assign Revelant
                </button>
            </div>

        <ToastContainer />
    </div>
  );
}

export default AssignParent;
