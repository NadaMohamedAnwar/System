import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addUsers, fetchActiveDepartments, fetchCategories } from "../Redux/Actions/Action";

function AddHead() {
  const dispatch = useDispatch();


  // State for required fields
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [salary, setSalary] = useState("");
//   const [Picture,setPicture]=useState(null);
//   const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [businessUserId, setBusinessUserId] = useState("");
  const [userNationalId, setUserNationalId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departmentId, setdepartmentId] = useState({});

  const [errors, setErrors] = useState({});
  const { Departments } = useSelector((state) => state.Departments);
  useEffect(() => {
      dispatch(fetchActiveDepartments());
  }, [dispatch]);
  const handleDepChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setdepartmentId(selectedOptions);
  };
  // **Validation Function**
  const validateInputs = () => {
    let newErrors = {};

    if (!businessUserId) {
      newErrors.businessUserId = "Business User ID is required.";
    }
    if (!userNationalId || userNationalId.length < 1 || userNationalId.length > 14) {
      newErrors.userNationalId = "National ID must be between 1 and 14 characters.";
    }
    if (!username || username.length < 1) {
      newErrors.username = "Username is required.";
    }
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (phoneNumber && !/^\d{7,15}$/.test(phoneNumber)) {
      newErrors.phone = "Invalid phone number format.";
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//     setPicture(file);
//     setProfilePictureUrl(file.type)
//     console.log('File details:', file,profilePictureUrl);
//     }
// };
  // **Submit Function**
  const handleSubmit = async () => {
    if (!validateInputs()) {
        toast.error("Please fix the errors before submitting.");
        return;
    }

    const userData = {
      organizationId: parseInt(sessionStorage.getItem("orgId"), 10),
      name: name,
      dateOfBirth: dateOfBirth,
      address: address,
      postalCode: postalCode,
      dateHired: dateHired,
      salary: parseFloat(salary),
      userStatus: true,
      businessUserId: businessUserId ? parseInt(businessUserId, 10) : null,
      userNationalId: userNationalId,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      departmentsIds: departmentId.length > 0 ? departmentId : null
  };
    
    
    // if (Picture) {
    //     formData.append("Picture", Picture);
    // }
    const type = "RegisterHeadManager";

    try {
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, value);  
        // }
        await dispatch(addUsers(userData, type));
        toast.success("User added successfully!");

        // Reset Form
        setName("");
        setDateOfBirth("");
        setAddress("");
        setPostalCode("");
        setDateHired("");
        setSalary("");
        // setPicture(null);
        // setProfilePictureUrl("");
        setBusinessUserId("");
        setUserNationalId("");
        setUsername("");
        setEmail("");
        setPhoneNumber("");
        setErrors({});
    } catch (error) {
        console.error("Error adding user:", error);
        toast.error("An error occurred. Please try again.");
    }
};

  const [currentSection, setCurrentSection] = useState(0);
  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 3);
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 3) % 3);
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
            <h3 className="text-color">Add New Head</h3>
            <div className="stage-indicator">
                <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
                    <span>1</span>
                    <p>Personal Info</p>
                </div>
                <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
                    <span>2</span>
                    <p>Account Info</p>
                </div>
                <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
                    <span>3</span>
                    <p>Contact Info</p>
                </div>
                {/* <div className={`stage-item ${currentSection === 3 ? "active" : ""}`}>
                    <span>4</span>
                    <p>Profile Photo</p>
                </div> */}
            </div>
            {currentSection === 0 && (
                <div className="org-data-div">
                     <h5 className="text-color">Personal Info</h5>
                     <div className="input-org">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="input-org">
                        <label>National ID</label>
                        <input
                            type="text"
                            value={userNationalId}
                            onChange={(e) => setUserNationalId(e.target.value)}
                            placeholder="Enter National ID"
                        />
                        {errors.userNationalId && <small className="error">{errors.userNationalId}</small>}
                    </div>
                    <div className="input-org">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            placeholder="Enter Date of Birth"
                        />
                    </div>
                    <div className="input-org">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Address"
                        />
                    </div>
                   
                </div>)}
            {currentSection === 1 && (
                <div className="org-data-div">
                     <h5 className="text-color">Account Info</h5>
                     <div className="input-org">
                        <label>Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Enter Postal Code"
                        />
                    </div>
                   
                    <div className="input-org">
                        <label>Business User ID</label>
                        <input
                            type="number"
                            value={businessUserId}
                            onChange={(e) => setBusinessUserId(e.target.value)}
                            placeholder="Enter Business User ID"
                        />
                        {errors.businessUserId && <small className="error">{errors.businessUserId}</small>}
                    </div>
                    <div className="input-org">
                        <label>Hirring Date</label>
                        <input
                            type="date"
                            value={dateHired}
                            onChange={(e) => setDateHired(e.target.value)}
                            placeholder="Enter Hirring Date"
                        />
                    </div>
                    <div className="input-org">
                        <label>Salary</label>
                        <input
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Enter Salary"
                        />
                    </div>
                    
                    
            
                </div>
                )}
             
            {currentSection === 2 && (
                <div className="org-data-div">
                    <h5 className="text-color">Contact Info</h5>
                    <div className="input-org">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                        />
                        {errors.username && <small className="error">{errors.username}</small>}
                    </div>
                    <div className="input-org">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                        />
                        {errors.email && <small className="error">{errors.email}</small>}
                    </div>
                    <div className="input-org">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter Phone Number"
                        />
                        {errors.phone && <small className="error">{errors.phone}</small>}
                        
                    </div>
                    <div className="input-org">
              <label>Department (Select multiple)</label>
              <select multiple
                value={departmentId}
                onChange={handleDepChange}
              >
                {Departments && Departments.length > 0 ? (
                  Departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                  ))
                ) : (
                  <option>No Departments available</option>
                )}
              </select>
            </div>
            <button onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }}>
                        Submit
                </button>
              </div>)}
              {/* {currentSection === 3 && (
                <div className="org-data-div">
                    <h5 className="text-color">Profile Photo</h5>
                    <div className="input-org">
                        <label>Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {errors.username && <small className="error">{errors.username}</small>}
                    </div>
                    
                    
              </div>)} */}
            {/* Navigation Buttons */}
            <div style={{ marginTop: "10px" }}>
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

export default AddHead;
