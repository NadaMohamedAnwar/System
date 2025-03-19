import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SidebarMenu from "../Layouts/sidemenue";
import { fetchAllTasks } from "../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ViewCase() {
  const [caseDetails, setCaseDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Tasks = [] } = useSelector((state) => state.Tasks || {});
  const [arbitraries, setarbitraries] = useState([]);
  const { state } = useLocation();
  const{id}=useParams();

  useEffect(() => {
    if (state?.Case) {
      dispatch(fetchAllTasks("", "", "", "", id, "", "", "",[]));
      setCaseDetails(state.Case);
      // console.log(caseDetails)
      const fetchCourts = async () => {
        try {
          const token = sessionStorage.getItem('token'); 
          const response = await axios.get(`http://agentsys.runasp.net/api/Cases/${id}/arbitraries`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          // console.log(response.data)
          setarbitraries(response.data);
        } catch (error) {
        
          console.error("Error:", error);
        } 
      };
      fetchCourts();
      
    }
  }, [state]);
  // useEffect(() => {
    
  //     console.log(caseDetails)
    
  // }, [caseDetails]);
  if (!caseDetails) {
    return <div className="text-center mt-10 text-lg my-5">No case details available.</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50">
        <h2 className="check-head text-color mb-4">Case Details</h2>
        <div className="case-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="text-color">Basic Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Title:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.title} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Case Type:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.casetype} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Client:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.clientName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Case Status:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.caseStatus} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label ">Description:</label>
                <textarea className="form-control form-control-sm" value={caseDetails.description} disabled rows="1"></textarea>
              </div>
            </div>

            {/* Case Details */}
            <div className="col-md-4">
              <h5 className="text-color">Opposing Party</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Opposing Party:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.opposingParty} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Opposing Lawyer:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.opposingLawyer} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">Start Date:</label>
                <input type="text" className="form-control form-control-sm" value={new Date(caseDetails.startDate).toLocaleDateString()} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 ">End Date:</label>
                <input type="text" className="form-control form-control-sm" value={new Date(caseDetails.endDate).toLocaleDateString()} disabled />
              </div>
             
            </div>

            {/* Date & Documents */}
            <div className="col-md-4">
              <h5 className="text-color">Documents</h5>
              
              <div className="mb-2">
                <label className="form-label">Case Documents:</label>
                <div className="border p-2 rounded bg-white" style={{ minHeight: "40px" }}>
                  {caseDetails.caseDocuments.length > 0 ? (
                    caseDetails.caseDocuments.map((doc, index) => (
                      <div key={doc.id} className="text-truncate">
                        
                        <a href={`http://agentsys.runasp.net${doc.documentUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary ms-1">
                        <strong>{doc.documentName}</strong>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="m-0 text-muted">No documents available</p>
                  )}
                </div>
              </div>

            </div>
            <div className="col-md-4">
            <h5 className="text-color">Tasks</h5>
            <div className="border p-2 rounded  bg-white" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {Tasks.length > 0 ? (
                Tasks.map((task) => (
                    <div key={task.id} className="mb-2 p-2 border-bottom" onClick={() =>
                        navigate(`/view-task/${task.id}`, { state: { task } })
                    }
                    style={{ cursor: "pointer", transition: "0.3s", borderRadius: "5px" }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}>
                    <strong>{task.taskName}</strong>
                    <p className="m-0 text-muted">Assigned to: {task.assignedToUserName}</p>
                    <p className="m-0">Priority: {task.priorityName} | Status: {task.statusName}</p>
                    <p className="m-0">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                ))
                ) : (
                <p className="m-0 text-muted">No tasks available</p>
                )}
            </div>
            </div>
            <div className="col-md-4">
            <h5 className="text-color">Arbitraries</h5>
            <div className="border p-2 rounded bg-white" style={{ maxHeight: "300px", overflowY: "auto" }}>
              {arbitraries.length > 0 ? (
                arbitraries.map((arbitrary) => (
                  <div
                    key={arbitrary.courtId}
                    className="mb-2 p-2 border-bottom"
                    style={{ cursor: "pointer", transition: "0.3s", borderRadius: "5px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                  >
                    <strong>Court ID: {arbitrary.courtId}</strong>
                    <p className="m-0">Hearing Date: {new Date(arbitrary.hearingDate).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="m-0 text-muted">No arbitraries available</p>
              )}
            </div>
          </div>

          </div>
        </div>
        <button onClick={() => navigate(-1)} className="filter-btn">Back</button>
      </div>
    </div>
  );
}

export default ViewCase;