import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addCases, assignCaseToParent, attachCaseFile, fetchCases, fetchClients } from "../Redux/Actions/Action";
import { useNavigate } from "react-router-dom";

function AddCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [price, setPrice] = useState("");
  const [opposingParty, setOpposingParty] = useState("");
  const [opposingLawyer, setOpposingLawyer] = useState("");
  const [startDate, setStartDate] = useState("");
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
  const[clients,setclients]=useState([])
  const orgId=parseInt(sessionStorage.getItem("orgId"), 10)
  useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]); 
  useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]); 
    useEffect(() => {
        const RevelantCases=Cases.filter((c) => c.clientId == clientId);
        setRevelantCases(RevelantCases)
           
    }, [CaseId]);
    useEffect(() => {
        if (Clients.length > 0) {
            const filteredClients = Clients.filter((c) => c.organizationId === orgId);
            setclients(filteredClients);
            console.log("Filtered Clients:", filteredClients);
        }
    }, [Clients, orgId]);
  
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        console.log("File details:", selectedFile);
      }
    };

  const handleNext = () => setCurrentSection((prev) => (prev + 1) % 5);
  const handlePrevious = () => setCurrentSection((prev) => (prev - 1 + 5) % 5);

  const validateInputs = () => {
    let newErrors = {};

    if (!title || title.length < 1 || title.length > 100) {
      newErrors.title = "Title must be between 1 and 100 characters.";
    }
    if (price !== "" && price < 0) {
      newErrors.price = "Price must be greater than or equal to 0.";
    }
    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }
    if (!pricingType) {
      newErrors.pricingType = "Pricing Type is required.";
    }
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
      price: .00,
      opposingParty: opposingParty || null,
      opposingLawyer: opposingLawyer || null,
      startDate,
      caseType: parseInt(caseType,10),
      clientId: parseInt(clientId),
      organizationId: parseInt(sessionStorage.getItem("orgId"), 10),
      ClientPositionType:parseInt(ClientPosition,10)
    };

    try {
      console.log(caseData)
      const newCase=await dispatch(addCases(caseData));
      setCaseId(newCase.id)
      toast.success("Case added successfully!");
      setTitle("");
      setDescription("");
      setPricingType("");
      setPrice("");
      setOpposingParty("");
      setOpposingLawyer("");
      setStartDate("");
      setCaseType("");
      // setClientId("");
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
   const handleAssignParent = async () => {
  
  
      try {
        await dispatch(assignCaseToParent(CaseId,linkedCaseId));
        toast.success("Task Assigned successfully!");
        
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
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
        setCaseId("");
        setCurrentSection(0)
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };
  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
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
            <p>Financial Info</p>
          </div>
          <div className={`stage-item ${currentSection === 3 ? "active" : ""}`}>
            <span>4</span>
            <p>Assign Relevant</p>
          </div>
          <div className={`stage-item ${currentSection === 4 ? "active" : ""}`}>
            <span>5</span>
            <p>Document</p>
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
                {clients && clients.length > 0 ? (
                  clients.map((client) => (
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
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onBlur={handleInputBlur}
              />
              {errors.startDate && (
                <small className="error" style={{color:"red"}}>{errors.startDate}</small>
              )}
            </div>
          </div>
        )}

        {/* Section 3: Financial Info */}
        {currentSection === 2 && (
          <div className="org-data-div">
            <h5 className="text-color">Financial Info</h5>
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
                Assign Parent
                </button>
            </div>
       )}
       {currentSection === 4 && (
            <div className="org-data-div">
               <h3 className="text-color">Attach Case Document</h3>
              <div className="input-org">
                <label>Case</label>
                <select value={CaseId} onChange={(e) => setCaseId(e.target.value)}>
                  <option value="">Select Case</option>
                  {Cases && Cases.length > 0 ? (
                    Cases.map((Case) => (
                      <option key={Case.id} value={Case.id}>
                        {Case.title}
                      </option>
                    ))
                  ) : (
                    <option>No Cases available</option>
                  )}
                </select>
              </div>
              <div className="input-org">
                <label>Document</label>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
              </div>

              <button onClick={handleAttachFile}>Attach</button>
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
