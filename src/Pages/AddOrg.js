import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrgCss from "../Css/OrgCss.css";
import axios from "axios";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { addAOrg } from "../Redux/Actions/Action";

function AddOrg() {
  const [name, setname] = useState("");
  const [type, settype] = useState("0");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [accountAderss, setaccountAderss] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [financialLimitFrom, setFinancialLimitFrom] = useState("");
  const [financialLimitTo, setFinancialLimitTo] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [organizationFinancialId, setOrganizationFinancialId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [primaryContactAddress, setPrimaryContactAddress] = useState("");
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 3); 
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 3) % 3); 
  };
  const validateInputs = () => {
    let newErrors = {};

    if (!name || name.length < 1 || name.length > 100) {
      newErrors.name = "Organization name must be between 1 and 100 characters.";
    }
    if (!licenseId || licenseId.length < 1 || licenseId.length > 50) {
      newErrors.licenseId = "License ID must be between 1 and 50 characters.";
    }
    if (financialLimitFrom !== "" && financialLimitFrom < 0) {
      newErrors.financialLimitFrom = "Financial Limit From must be ≥ 0.";
    }
    if (financialLimitTo !== "" && financialLimitTo < 0) {
      newErrors.financialLimitTo = "Financial Limit To must be ≥ 0.";
    }
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      newErrors.phone = "Invalid phone number format.";
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

    const orgData = {
      organizationName: name,
      industryType: parseInt(type,10),
      primaryContactName: contact,
      primaryContactPhone: phone,
      primaryContactEmail: email,
      primaryContactAddress: primaryContactAddress,
      organizationStatus: true,
      licenseId: licenseId,
      organizationFinancialId: organizationFinancialId,
      postalCode: postalCode,
      financialLimitFrom: parseFloat(financialLimitFrom) || null,
      financialLimitTo: parseFloat(financialLimitTo) || null,
      bankAccount: bankAccount,
      // address: accountAderss,
    };

    try {
      await dispatch(addAOrg(orgData));
      toast.success("Organization added successfully!");
      setname("");
      settype(0);
      setphone("");
      setemail("");
      setcontact("");
      // setaccountAderss("");
      setBankAccount("");
      setFinancialLimitFrom("");
      setFinancialLimitTo("");
      setLicenseId("");
      setOrganizationFinancialId("");
      setPostalCode("");
      setPrimaryContactAddress("");
      setErrors({});
      setCurrentSection(0);
    } catch (error) {
      toast.error("An error occurred. Please try again.",error);
    }
  };


  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add New Organization</h3>
        <div className="stage-indicator">
          <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
            <span>1</span>
            <p>Info</p>
          </div>
          <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
            <span>2</span>
            <p>Contact</p>
          </div>
          <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
            <span>3</span>
            <p>Financial</p>
          </div>
        </div>

        {/* Section 1: Organization Info */}
        {currentSection === 0 && (
          <div className="org-data-div">
            <h5 className="text-color">Organization Info</h5>
            <div className="input-org">
              <label>Organization Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Organization Name"
              />
              {errors.name && <small className="error" style={{color:"red"}}>{errors.name}</small>}
            </div>
            <div className="input-org">
              <label>Industry Type</label>
              <select
                value={type}
                onChange={(e) => settype(e.target.value)}
              >
                <option value={0}>Retail</option>
                <option value={1}>Manufacturing</option>
                <option value={2}>Healthcare</option>
                <option value={3}>Finance</option>
                <option value={4}>IT</option>
                <option value={5}>Education</option>
                <option value={6}>RealEstate</option>
                <option value={7}>Agriculture</option>
                <option value={8}>Construction</option>
                <option value={9}>Transportation</option>
                <option value={10}>Hospitality</option>
                <option value={11}>Energy</option>
                <option value={12}>Entertainment</option>
                <option value={13}>Telecommunications</option>
                <option value={14}>Other</option>
              </select>
            </div>
            <div className="input-org">
              <label>License ID</label>
              <input
                type="text"
                value={licenseId}
                onChange={(e) => setLicenseId(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter License ID"
              />
              {errors.licenseId && <small className="error" style={{color:"red"}}>{errors.licenseId}</small>}
            </div>
            <div className="input-org">
              <label>Organization Financial ID</label>
              <input
                type="text"
                value={organizationFinancialId}
                onChange={(e) => setOrganizationFinancialId(e.target.value)}
                placeholder="Enter Financial ID"
              />
            </div>
          </div>
        )}

        {/* Section 2: Contact Info */}
        {currentSection === 1 && (
          <div className="org-data-div">
            <h5 className="text-color">Contact Info</h5>
            <div className="input-org">
              <label>Contact Name</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
                placeholder="Enter Contact Name"
              />
            </div>
            <div className="input-org">
              <label>Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Contact Phone"
              />
              {errors.phone && <small className="error" style={{color:"red"}}>{errors.phone}</small>}
            </div>
            <div className="input-org">
              <label>Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Contact Email"
              />
              {errors.email && <small className="error" style={{color:"red"}}>{errors.email}</small>}
            </div>
            <div className="input-org">
              <label>Contact Address</label>
              <input
                type="text"
                value={primaryContactAddress}
                onChange={(e) => setPrimaryContactAddress(e.target.value)}
                placeholder="Enter Contact Address"
              />
            </div>
          </div>
        )}

        {/* Section 3: Financial Info */}
        {currentSection === 2 && (
          <div className="org-data-div">
            <h5 className="text-color">Financial Info</h5>
            <div className="input-org">
              <label>Bank Account</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Enter Bank Account"
              />
            </div>
            <div className="input-org">
              <label>Financial Limit From</label>
              <input
                type="number"
                value={financialLimitFrom}
                onChange={(e) => setFinancialLimitFrom(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Minimum Financial Limit"
              />
              {errors.financialLimitFrom && <small className="error" style={{color:"red"}}>{errors.financialLimitFrom}</small>}
            </div>
            <div className="input-org">
              <label>Financial Limit To</label>
              <input
                type="number"
                value={financialLimitTo}
                onChange={(e) => setFinancialLimitTo(e.target.value)}
                onBlur={handleInputBlur}
                placeholder="Enter Maximum Financial Limit"
              />
              {errors.financialLimitTo && <small className="error" style={{color:"red"}}>{errors.financialLimitTo}</small>}
            </div>
            <button onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }}>
              Submit
            </button>
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

export default AddOrg;
