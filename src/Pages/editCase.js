import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { editCases, fetchClients } from "../Redux/Actions/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditCase() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [price, setPrice] = useState("");
  const [opposingParty, setOpposingParty] = useState("");
  const [opposingLawyer, setOpposingLawyer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [caseType, setCaseType] = useState("");
  const [clientId, setClientId] = useState("");
 
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { id } = useParams();
  const dispatch = useDispatch();
  
    // Set default values if state contains org data
    useEffect(() => {
      if (state?.Case) {
        const Case = state.Case;
        console.log(Case)
        setTitle(Case.title ||"");
        setDescription(Case.description ||"");
        setPricingType(Case.pricingType ||"");
        setPrice(Case.price ||"");
        setOpposingParty(Case.opposingParty ||"");
        setOpposingLawyer(Case.opposingLawyer ||"");
        setStartDate(Case.startDate||"");
        setCaseType(Case.caseType||"");
        setClientId(Case.clientId ||"");
      }
    }, [state]);
  
  const { Clients } = useSelector((state) => state.Clients);

 const[clients,setclients]=useState([])
     const organizationId=parseInt(sessionStorage.getItem("orgId"), 10)
     useEffect(() => {
         dispatch(fetchClients());
         const clients = Clients.filter((c) => c.organizationId === organizationId);
         setclients(clients)
     }, [dispatch]);


  const handleNext = () => setCurrentSection((prev) => (prev + 1) % 3);
  const handlePrevious = () => setCurrentSection((prev) => (prev - 1 + 3) % 3);

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

  const handleSubmit = async () => {
    if (!validateInputs()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const caseData = {
      title,
      description: description || null,
      pricingType: parseInt(pricingType),
      price: price ? parseFloat(price) : null,
      opposingParty: opposingParty || null,
      opposingLawyer: opposingLawyer || null,
      startDate,
      caseType: parseInt(caseType),
      clientId: parseInt(clientId),
      organizationId: parseInt(sessionStorage.getItem("orgId"), 10),
    };

    try {
      await dispatch(editCases(id,caseData));
      toast.success("Case added successfully!");
      setTitle("");
      setDescription("");
      setPricingType("");
      setPrice("");
      setOpposingParty("");
      setOpposingLawyer("");
      setStartDate("");
      setCaseType("");
      setClientId("");
      setErrors({});
      setCurrentSection(0);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Edit Case</h3>
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
              {errors.caseType && (
                <small className="error" style={{color:"red"}}>{errors.caseType}</small>
              )}
            </div>
            <div className="input-org">
              <label>Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                {clients && clients.length > 0 ? (
                  clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.contactName}</option>
                  ))
                ) : (
                  <option>No Clients available</option>
                )}
              </select>
              
            </div>
            <button onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }}>
            Edit
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

export default EditCase;
