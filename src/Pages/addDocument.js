import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrgCss from "../Css/OrgCss.css";
import axios from "axios";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { addAOrg } from "../Redux/Actions/Action";
import MapModal from "../Components/map-model";

function AddDocument() {
  const [Addloading, setAddloading] = useState(false); 
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          setFile(selectedFile);
          // console.log("File details:", selectedFile);
        }
      };
  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 2); 
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 2) % 2); 
  };
  const validateInputs = () => {
    let newErrors = {};

    if (!name || name.length < 1 || name.length > 100) {
      newErrors.name = "Document name must be between 1 and 100 characters.";
    }
    // if (!licenseId || licenseId.length < 1 || licenseId.length > 50) {
    //   newErrors.licenseId = "License ID must be between 1 and 50 characters.";
    // }
    // if (financialLimitFrom !== "" && financialLimitFrom < 0) {
    //   newErrors.financialLimitFrom = "Financial Limit From must be ≥ 0.";
    // }
    // if (financialLimitTo !== "" && financialLimitTo < 0) {
    //   newErrors.financialLimitTo = "Financial Limit To must be ≥ 0.";
    // }
    // if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   newErrors.email = "Invalid email format.";
    // }
    // if (phone && !/^\+?\d{7,15}$/.test(phone)) {
    //   newErrors.phone = "Invalid phone number format.";
    // }

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
    setAddloading(true);
    const DocData = {
     Name: name,
    };

    try {
      await dispatch(addAOrg(DocData));
      toast.success("Document added successfully!");
      setCurrentSection(0);
    } catch (error) {
      toast.error("An error occurred. Please try again.",error);
    }finally {
      setAddloading(false); 
    }
  };


  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add New Document</h3>
        <div className="stage-indicator">
          <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
            <span>1</span>
            <p>Info</p>
          </div>
          <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
            <span>2</span>
            <p>Document</p>
          </div>
         
        </div>

        {/* Section 1: Organization Info */}
        {currentSection === 0 && (
          <div className="org-data-div">
            <h5 className="text-color">Document Info</h5>
            <div className="input-org">
              <label>Document Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Organization Name"
              />
              {errors.name && <small className="error" style={{color:"red"}}>{errors.name}</small>}
            </div>
            
          </div>
        )}

        {/* Section 2: Contact Info */}
        {currentSection === 1 && (
          <div className="org-data-div">
            <h5 className="text-color">Document</h5>
            <div className="input-org">
                <label>Document</label>
                <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
            </div>
            <button className="loading-buttons"  onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }} disabled={Addloading}>
                {Addloading ? (
                <span className="loader"></span> 
              ) : (
                'Submit'
              )}</button>
          </div>
        )}

        
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

export default AddDocument;
