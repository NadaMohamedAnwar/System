
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { assignCaseTocourts, editCases, fetchAllTasks, fetchCases, fetchClients, fetchCourts } from "../Redux/Actions/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCase() {
  const caseTypeMap = {
    "Civil": 0,
    "Criminal": 1,
    "Corporate": 2,
    "Labour": 3,
    "Real Estate": 4,
    "Intellectual": 5,
    "Family": 6,
    "Administrative": 7,
    "Constitutional": 8,
    "Other": 9
  };
  
  const clientPositionTypeMap = {
    "Claimant": 1,
    "Defendant": 2
  };
  const caseStatusMap = {
    "New": 0,
    "Assigned": 1,
    "Under Review": 2,
    "Rejected": 3,
    "Active": 4,
    "Suspended": 5,
    "Negotiation": 6,
    "In Court": 7,
    "Resolved": 8,
    "Verdict": 9,
    "Resumed": 10
  };
  const dispatch = useDispatch();
  const [editloading,seteditloading]=useState(false)
  const [title, setTitle] = useState("");
  const [caseType, setCaseType] = useState("");
  const [clientId, setClientId] = useState("");
  const [caseStatus, setCaseStatus] = useState("");
  const [opposingParty, setOpposingParty] = useState("");
  const [opposingLawyer, setOpposingLawyer] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [linkedCaseIds, setLinkedCaseIds] = useState([]);
  const [arbitrations, setArbitrations] = useState([]);

  const [clientPositionType, setClientPositionType] = useState("");
  const { Clients } = useSelector((state) => state.Clients);
  const {Courts} = useSelector((state)=> state.Courts)
  const [selectedCourt, setSelectedCourt] = useState("");
  const [hearingDate, setHearingDate] = useState("");
  const { state } = useLocation(); 
  const { id } = useParams();
    const navigate = useNavigate();
  const [RevelantCases, setRevelantCases] = useState([]);
  const { Cases } = useSelector((state) => state.Cases);
  useEffect(() => {
    dispatch(fetchCases());
    
  }, [dispatch]);
  useEffect(() => {
    if (state?.Case  && Cases) {
      const Case = state.Case;
      console.log(Case)
      setTitle(Case.title || "");
      setCaseType(caseTypeMap[Case.casetype || ""]);
      setClientId(Case.clientId || "");
      setCaseStatus(caseStatusMap[Case.caseStatus || ""]);
      setOpposingParty(Case.opposingParty || "");
      setOpposingLawyer(Case.opposingLawyer || "");
      setDescription(Case.description || "");
      setStartDate(Case.startDate ? Case.startDate: "");
      setEndDate(Case.endDate ? Case.endDate: "");
      setClientPositionType(clientPositionTypeMap[Case.clientPositionType || ""]);
      const fetchCourts = async () => {
        try {
          const token = sessionStorage.getItem('token'); 
          const response = await axios.get(`http://agentsys.runasp.net/api/Cases/${id}/arbitraries`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          // console.log(response.data)
          setArbitrations(response.data);
        } catch (error) {
        
          console.error("Error:", error);
        } 
      };
      fetchCourts();
      const fetchLinkedCases = async () => {
        try {
          const token = sessionStorage.getItem('token'); 
          const response = await axios.get(`http://agentsys.runasp.net/api/Cases/${id}/linked`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          // console.log(response.data)
          setLinkedCaseIds(response.data.map(c => c.id)); 
        } catch (error) {
        
          console.error("Error:", error);
        } 
      };
      fetchLinkedCases();
      setRevelantCases(
        Cases.filter((c) => c.clientId === Case.clientId && c.id !== parseInt(Case.id,10))
      );
    }
  }, [state]);
 
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => parseInt(option.value,10));
    setLinkedCaseIds(selectedValues);
  };

  const handleSubmit = async () => {
    seteditloading(true)
    const caseDto = {
      id: parseInt(id, 10),
      title,
      description: description || null,
      caseStatus: parseInt(caseStatus, 10),
      opposingParty: opposingParty || null,
      opposingLawyer: opposingLawyer || null,
      startDate,
      endDate,
      linkedCaseIds,
      arbitrations,
      casetype: parseInt(caseType, 10),
      clientId: parseInt(clientId),
      clientPositionType: parseInt(clientPositionType, 10)
    };
  
    try {
      console.log(caseDto);
      
      const response = await dispatch(editCases(id, caseDto));
  
      if (response?.error) {
        throw new Error(response.error); // Ensure error gets caught
      }
  
      toast.success("Case Updated successfully!");
      
    } catch (error) {
      console.log("Full Error Response:", error.response?.data || error.message);
      toast.error("An error occurred. Please try again.");
    }finally{
      seteditloading(false)
    }
  };
  


  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
  };

  const handleHearingDateChange = (event) => {
    setHearingDate(event.target.value);
  };
  const handleAddArbitration = () => {
    if (!selectedCourt || !hearingDate) {
      alert("Please select a court and hearing date before adding an arbitration.");
      return;
    }

    const newArbitration = {
      courtId: parseInt(selectedCourt,10),
      hearingDate: hearingDate,
      caseId: parseInt(id,10),
      id:null,

    };

    setArbitrations((prev) => [...prev, newArbitration]);

  };

   useEffect(() => {
          dispatch(fetchClients());
          dispatch(fetchCourts())
         
      }, [dispatch]); 
 
          
  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50">
        <h2 className="check-head text-color mb-4">Edit Case</h2>
        <div className="case-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            <div className="col-md-4">
            <h5 className="text-color">Basic Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Title:</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="input-org">
                <label>Case Type</label>
                <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                  <option value="0">Civil</option>
                  <option value="1">Criminal</option>
                  <option value="2">Corporate</option>
                  <option value="3">Labour</option>
                  <option value="4">Real Estate</option>
                  <option value="5">Intellectual</option>
                  <option value="6">Family</option>
                  <option value="7">Administrative</option>
                  <option value="8">Constitutional</option>
                  <option value="9">Other</option>
                </select>
              </div>
              <div className="input-org">
                <label>Client Position</label>
                <select value={clientPositionType} onChange={(e) => setClientPositionType(e.target.value)}>
                  <option value="">Select Client Position Type</option>
                  <option value="1">Claimant</option>
                  <option value="2">Defendant</option>
                </select>
              </div>
              <div className="input-org">
                <label>Client</label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                  <option value="">Select Client</option>
                  {Clients.length > 0 ? (
                    Clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.contactName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No Clients available</option>
                  )}
                </select>
              </div>

              <div className="input-org">
                <label>Case Status</label>
                <select value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}>
                <option value="0">New</option>
                <option value="1">Assigned</option>
                <option value="2">UnderReview</option>
                <option value="3">Active</option>
                <option value="4">Rejected</option>
                <option value="5">Negotiation</option>
                <option value="6">Resolved</option>
                <option value="7">InCourt</option>
                <option value="8">Suspended</option>
                <option value="9">Verdict</option>
                <option value="10">Resumed</option>
                </select>
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Description:</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

            </div>
            <div className="col-md-4">
              <h5 className="text-color">Opposing Party</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Opposing Party:</label>
                <input type="text" className="form-control" value={opposingParty} onChange={(e) => setOpposingParty(e.target.value)} />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Opposing Lawyer:</label>
                <input type="text" className="form-control" value={opposingLawyer} onChange={(e) => setOpposingLawyer(e.target.value)} />
              </div>
              
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Start Date:</label>
                <input type="datetime-local" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">End Date:</label>
                <input type="datetime-local" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="input-org">
                <label>Relevant Case</label>
                <select value={linkedCaseIds} onChange={handleSelectChange} multiple>
                  <option value="">Select Case</option>
                  {RevelantCases.length > 0 ? (
                    RevelantCases.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)
                  ) : (
                    <option>No Cases available</option>
                  )}
                </select>
              </div>

            </div>
            
            <div className="col-md-4">
            <h5 className="text-color">Arbitraries</h5>
            <div className="div-arbitrations">
                <div className="input-org">
                  <label>Court</label>
                  <select value={selectedCourt} onChange={handleCourtChange}>
                    <option value="" disabled>Select a court</option>
                    {Courts.length > 0 ? (
                      Courts.map((court) => (
                        <option key={court.courtId} value={court.courtId}>
                          {court.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Courts available</option>
                    )}
                  </select>
                </div>

                <div className="input-org">
                  <label>Hearing Date</label>
                  <input type="datetime-local" value={hearingDate} onChange={handleHearingDateChange} />
                </div>

                <button onClick={handleAddArbitration} className="custom-button">Add</button>
              </div>
            <div className="manage">
                  {arbitrations.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Court ID</th>
                          <th>Hearing Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {arbitrations.map((arb, index) => (
                          <tr key={index}>
                            <td>{arb.courtId}</td>
                            <td>{arb.hearingDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted">No arbitrations added yet.</p>
                  )}
                </div>
             
            </div>

            {/* Display Arbitrations */}
            <button onClick={() =>handleSubmit()} style={{ marginTop: "20px", width: "100%" }} className="loading-buttons"  disabled={editloading}>
                {editloading ? (
                <span className="loader"></span> 
              ) : (
                'Save'
              )}</button>
        </div>


        </div>
      </div>
        <ToastContainer />
    </div>
  );
}

export default EditCase;
