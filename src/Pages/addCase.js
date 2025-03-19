import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addCases, assignCaseToAgent, assignCaseTocourts, assignCaseToParent, attachCaseFile, fetchCases, fetchClients, fetchCourts, fetchUsers } from "../Redux/Actions/Action";
import { useNavigate } from "react-router-dom";

function AddCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [price, setPrice] = useState("");
  const [opposingParty, setOpposingParty] = useState("");
  const [opposingLawyer, setOpposingLawyer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate,setendDate]=useState("");
  const [caseType, setCaseType] = useState("");
  const [clientId, setClientId] = useState("");
  const [ClientPosition, setClientPosition] = useState("");
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [CaseId, setCaseId] = useState("");
  const [linkedCaseId, setlinkedCaseId] = useState("");
  const [errors, setErrors] = useState({});
   const [RevelantCases, setRevelantCases] = useState([]);
  const dispatch = useDispatch();
  const { Cases} = useSelector((state) => state.Cases);
  const { Clients } = useSelector((state) => state.Clients);
  const {Courts} = useSelector((state)=> state.Courts)
  const [selectedCourt, setSelectedCourt] = useState(0);
  const [arbitrations, setArbitrations] = useState([]);
  const [hearingDate, setHearingDate] = useState("");
  const { Users } = useSelector((state) => state.Users);
  const [AgentId, setAgentId] = useState("");
  const [Agents, setAgents] = useState([]);
  const orgId=parseInt(sessionStorage.getItem("orgId"), 10)
 
  useEffect(() => {
        dispatch(fetchClients());
        dispatch(fetchCourts())
        dispatch(fetchUsers());
    }, [dispatch]); 
     useEffect(() => {
         if (Users && Users.length > 0) {
           const agentList = Users.filter((u) => u.role === "Agent");
           setAgents(agentList);
           console.log("Agents:", agentList);
         }
       }, [Users]);
  useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]); 
    useEffect(() => {
        const RevelantCases=Cases.filter((c) => c.clientId === parseInt(clientId));
        setRevelantCases(RevelantCases)
           
    }, [CaseId]);
  
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        // console.log("File details:", selectedFile);
      }
    };

  const handleNext = () => setCurrentSection((prev) => (prev + 1) % 6);
  const handlePrevious = () => setCurrentSection((prev) => (prev - 1 + 6) % 6);

  const validateInputs = () => {
    let newErrors = {};

    if (!title || title.length < 1 || title.length > 100) {
      newErrors.title = "Title must be between 1 and 100 characters.";
    }
    // if (price !== "" && price < 0) {
    //   newErrors.price = "Price must be greater than or equal to 0.";
    // }
    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }
    // if (!pricingType) {
    //   newErrors.pricingType = "Pricing Type is required.";
    // }
    if (!caseType) {
      newErrors.caseType = "Case Type is required.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputBlur = () => {
    validateInputs();
  };

  const handleSubmit = async (exist) => {
    if (!validateInputs()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const caseData = {
      title,
      description: description || null,
      pricingType: 1,
      price: 100,
      opposingParty: opposingParty || null,
      opposingLawyer: opposingLawyer || null,
      startDate,
      endDate,
      caseType: parseInt(caseType,10),
      clientId: parseInt(clientId),
      organizationId: parseInt(sessionStorage.getItem("orgId"), 10),
      ClientPositionType:parseInt(ClientPosition,10)
    };

    try {
      // console.log(caseData)
      const newCase=await dispatch(addCases(caseData));
      // console.log(newCase)
      setCaseId(newCase.data.id)
      toast.success("Case added successfully!");
      setTitle("");
      setDescription("");
      setOpposingParty("");
      setOpposingLawyer("");
      setStartDate("");
      setendDate("");
      setCaseType("");
      // setClientId("");
      setErrors({});
      if(exist==1){
        navigate(-1)
      }else{
        setCurrentSection(2);
      }
      
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleAddArbitration = () => {
    if (!selectedCourt || !hearingDate) {
      alert("Please select a court and hearing date before adding an arbitration.");
      return;
    }

    const newArbitration = {
      courtId: parseInt(selectedCourt,10),
      hearingDate: hearingDate,
    };

    setArbitrations((prev) => [...prev, newArbitration]);
  };

   const handleAssignParent = async () => {
  
  
      try {
        await dispatch(assignCaseToParent(CaseId,linkedCaseId));
        toast.success("Case Assigned successfully!");
        setCurrentSection(4)
        
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };
    const handleAssignArbitrations = async () => {
  
  
      try {
      
        await dispatch(assignCaseTocourts(CaseId,arbitrations));
        toast.success("Task Assigned successfully!");
        setArbitrations([])
        setCurrentSection(3)
        
      } catch (error) {
       
        toast.error("An error occurred. Please try again.");
        
      }
    };
    const handleCourtChange = (event) => {
      setSelectedCourt(event.target.value);
    };
  
    const handleHearingDateChange = (event) => {
      setHearingDate(event.target.value);
    };
  
   
  const handleAttachFile = async () => {
      try {
        if (!file || !CaseId) {
          toast.error("Please select a case and upload a document.");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", file);
  
        await dispatch(attachCaseFile(CaseId,formData));
        toast.success("Document attached successfully!");
        setFile(null);
        setCurrentSection(5)
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };
    const handleAssignAgent = async () => {
        
        try {
          await dispatch(assignCaseToAgent(CaseId,AgentId));
          setCurrentSection(0);
          toast.success("Task Assigned successfully!");
         
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      };
  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-8">
        <h3 className="text-color">Add New Case</h3>
        <div className="stage-indicator">
          <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
            <span>1</span>
            <p>Basic Info</p>
          </div>
          <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
            <span>2</span>
            <p>Opposing Party</p>
          </div>
          <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
            <span>3</span>
            <p>Arbitrations</p>
          </div>
          <div className={`stage-item ${currentSection === 3 ? "active" : ""}`}>
            <span>4</span>
            <p>Assign Relevant</p>
          </div>
          <div className={`stage-item ${currentSection === 4 ? "active" : ""}`}>
            <span>5</span>
            <p>Document</p>
          </div>
          <div className={`stage-item ${currentSection === 5 ? "active" : ""}`}>
            <span>6</span>
            <p>Assign Agent</p>
          </div>
        </div>

        {/* Section 1: Basic Info */}
        {currentSection === 0 && (
          <div className="org-data-div">
            <h5 className="text-color">Basic Info</h5>
            <div className="input-org">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Title"
              />
              {errors.title && <small className="error" style={{color:"red"}}>{errors.title}</small>}
            </div>
            <div className="input-org">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </div>
            <div className="input-org">
              <label>Case Type</label>
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
              >
                <option value="">Select Case Type</option>
                <option value="0">Civil</option>
                <option value="1">Criminal</option>
                <option value="2">Corporate</option>
                <option value="3">Labour</option>
                <option value="4">RealEstate</option>
                <option value="5">Intellectual</option>
                <option value="6">Family</option>
                <option value="7">Administrative</option>
                <option value="8">Constitutional</option>
                <option value="9">Other</option>
              </select>
              {/* {errors.caseType && (
                <small className="error" style={{color:"red"}}>{errors.caseType}</small>
              )} */}
            </div>
            <div className="input-org">
              <label>Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              > <option value="">Select Client</option>
                {Clients && Clients.length > 0 ? (
                  Clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.contactName}</option>
                  ))
                ) : (
                  <option>No Clients available</option>
                )}
              </select>
              
            </div>
            <div className="input-org">
              <label>Client Position</label>
              <select value={ClientPosition} onChange={(e) => setClientPosition(e.target.value)}>
              <option value="">Select Client Position Type</option>
                <option value="1">Claimant</option>
                <option value="2">Defendant</option>
              </select>
            </div>
           
          </div>
        )}

        {/* Section 2: Opposing Party */}
        {currentSection === 1 && (
          <div className="org-data-div">
            <h5 className="text-color">Opposing Party</h5>
            <div className="input-org">
              <label>Opposing Party</label>
              <input
                type="text"
                value={opposingParty}
                onChange={(e) => setOpposingParty(e.target.value)}
                placeholder="Enter Opposing Party"
              />
            </div>
            <div className="input-org">
              <label>Opposing Lawyer</label>
              <input
                type="text"
                value={opposingLawyer}
                onChange={(e) => setOpposingLawyer(e.target.value)}
                placeholder="Enter Opposing Lawyer"
              />
            </div>
            <div className="input-org">
              <label>Start Date</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="input-org">
              <label>End Date</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setendDate(e.target.value)}
                onBlur={handleInputBlur}
              /> 
            </div>
            <button onClick={() =>handleSubmit(1)} style={{ marginTop: "20px", width: "100%" }}>
            Save and Exit
            </button>
            <button onClick={() =>handleSubmit(2)} style={{ marginTop: "20px", width: "100%" }}>
            Save and Continue
            </button>
          </div>
        )}

        {/* Section 3: Financial Info */}
        {currentSection === 2 && (
          <div className="org-data-div">
            <h5 className="text-color">Assign Arbitrations</h5>
             {/* <div className="input-org">
              <label>Pricing Type</label>
              <select
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
              >
                <option value="">Select Pricing Type</option>
                <option value="1">LumpSum</option>
                <option value="2">Variable</option>
              </select>
             
            </div>
            <div className="input-org">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Price"
              />
              {errors.price && <small className="error" style={{color:"red"}}>{errors.price}</small>}
            </div> */}
                <div className="div-arbitrations">
                <div className="input-org">
                  <label>Court</label>
                  <select value={selectedCourt} onChange={handleCourtChange}>
                    <option value="" disabled>Select a court</option>
                    {Courts && Courts.length > 0 ? (
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
                <button onClick={handleAddArbitration} style={{ marginTop: "20px", width: "100%" }}>Add</button>
                </div>
                <div className="manage">
                  {arbitrations.length > 0 ? (
                    <table>
                      
                      <tr> 
                         <th>Court ID</th>
                        <th>Hearing Date</th>
                        
                      </tr>
                      {arbitrations.map((arb, index) => (
                        <tr key={index}>
                         <td>{arb.courtId}</td>
                         <td>{arb.hearingDate}</td>
                        </tr>
                      ))}
                    </table>
                  ) : (
                    <td colSpan="2">No arbitrations added yet.</td>
                  )}

                </div>
                <button onClick={handleAssignArbitrations} style={{ marginTop: "20px", width: "100%" }}>
                Assign arbitrations
                </button>
                
          </div>)}
        {currentSection === 3 && (
            <div className="org-data-div">
                <h5 className="text-color">Assign Relevant</h5>
                <div className="input-org">
                  <label>Relevant Case</label>
                  <select
                  value={linkedCaseId}
                  onChange={(e) => setlinkedCaseId(e.target.value)}
                ><option value="">Select Case</option>
                 {RevelantCases && RevelantCases.length > 0 ? (
                    RevelantCases.map((Case) => (
                        <option key={Case.id} value={Case.id}>{Case.title}</option>
                    ))
                    ) : (
                    <option>No Tasks available</option>
                    )}
                </select>
                </div>

                <button onClick={handleAssignParent} style={{ marginTop: "20px", width: "100%" }}>
                Assign Relevant
                </button>
            </div>
       )}
       {currentSection === 4 && (
            <div className="org-data-div">
               <h3 className="text-color">Attach Case Document</h3>
              <div className="input-org">
                <label>Document</label>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
              </div>

              <button onClick={handleAttachFile}>Attach</button>
            </div>
       )}
        {currentSection === 5 && (
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

export default AddCase;
