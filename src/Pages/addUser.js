import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import {  addUsers, fetchActiveDepartments, fetchCategories, fetchOrgs } from "../Redux/Actions/Action";

function AddUser() {
  const [Addloading, setAddloading] = useState(false); 
  const dispatch = useDispatch();
  const { Categories} = useSelector((state) => state.Categories);
  const { Departments } = useSelector((state) => state.Departments);
  const { Orgs} = useSelector((state) => state.Orgs);
  const [orgId, setorgId] = useState(localStorage.getItem("orgId"));
  const [departments, setdepartments] = useState([]);
  
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchOrgs());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchActiveDepartments(orgId));
  }, [dispatch,orgId]);
  
  useEffect(() => {
    const deps = Departments.filter((d) => d.headManagerID === null);
    setdepartments(deps)
  }, [dispatch,Departments]);
  // State for required fields
  const [businessUserId, setBusinessUserId] = useState("");
  const [userNationalId, setUserNationalId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  


  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [salary, setSalary] = useState("");
  const [Picture,setPicture]=useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  const [categoriesId, setCategoriesId] = useState([]); 
  const [departmentId, setDepartmentId] = useState("");
  const userRoles = JSON.parse(localStorage.getItem('roles'));

  const [departmentIds, setdepartmentIds] = useState([]);
  const handleDepChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setdepartmentIds(selectedOptions);
  };




  const [roles, setRoles] = useState("");
  const [errors, setErrors] = useState({});

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setCategoriesId(selectedOptions);
  };
  const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setPicture(file);
        // console.log('File details:', file);
        }
    };
  // **Validation Function**
  const validateInputs = () => {
    let newErrors = {};

    if (!businessUserId) {
      newErrors.businessUserId = "Business User ID is required.";
    }
    if (!userNationalId || userNationalId.length != 14) {
      newErrors.userNationalId = "National ID must be 14 characters.";
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
    if (!departmentId && roles==="RegisterAgent") {
      newErrors.departmentId = "Department ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // **Submit Function**
  const handleSubmit = async () => {
    if (!validateInputs()) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
         });
      return;
    }
    setAddloading(true);
    const userData = new FormData();
   
    if(roles==="RegisterOrgAdmin"){
     

      userData.append("OrganizationId", parseInt(orgId, 10));
      userData.append("UserStatus", true);
      userData.append("BusinessUserId", businessUserId ? parseInt(businessUserId, 10) : null);
      userData.append("UserNationalId", userNationalId);
      userData.append("Username", username);
      userData.append("Email", email);
      userData.append("PhoneNumber", phoneNumber);
      userData.append("Name", name);
      userData.append("DateOfBirth", dateOfBirth);
      userData.append("Address", address);
      userData.append("DateHired", dateHired);
      userData.append("Salary", parseFloat(salary));

      // Optional Fields
      if (postalCode) {
        userData.append("PostalCode", postalCode);
      }

      // Required File (Profile Picture)
      if (Picture) {
        userData.append("Picture", Picture); 
      } else {
        throw new Error("Profile picture is required.");
      }


    }else if(roles==="RegisterHeadManager"){
      

      userData.append("OrganizationId", parseInt(orgId, 10));
      userData.append("Name", name);
      userData.append("DateOfBirth", dateOfBirth);
      userData.append("Address", address);
      userData.append("PostalCode", postalCode);
      userData.append("DateHired", dateHired);
      userData.append("Salary", parseFloat(salary));
      userData.append("UserStatus", true);
      userData.append("UserNationalId", userNationalId);
      userData.append("username", username);
      userData.append("Email", email);
      userData.append("PhoneNumber", phoneNumber);
      
      // Add optional fields if they exist
      if (businessUserId) {
        userData.append("BusinessUserId", parseInt(businessUserId, 10));
      }
      if (Picture instanceof File) {
        userData.append("UserPicture", Picture);
      } else {
        console.error("Invalid file type for Picture");
      }
      
      if (departmentIds.length > 0) {
        departmentIds.forEach((id) => {
          userData.append("DepartmentsIds", parseInt(id, 10)); 
        });
      } else {
        throw new Error("DepartmentsIds is required and cannot be empty.");
      }
        

    }else if(roles==="RegisterManager"){

        userData.append("OrganizationId", parseInt(orgId, 10));
        userData.append("Name", name);
        userData.append("DateOfBirth", dateOfBirth);
        userData.append("Address", address);
        userData.append("PostalCode", postalCode);
        userData.append("DateHired", dateHired);
        userData.append("Salary", parseFloat(salary));
        userData.append("UserStatus", true);
        userData.append("BusinessUserId", businessUserId ? parseInt(businessUserId, 10) : null);
        userData.append("UserNationalId", userNationalId);
        userData.append("username", username);
        userData.append("Email", email);
        userData.append("PhoneNumber", phoneNumber);
        if (Picture instanceof File) {
          userData.append("Picture", Picture);
        } else {
          console.error("Invalid file type for Picture");
        }
        
        // for (let pair of userData.entries()) {
        //   console.log(pair[0] + ': ' + pair[1]);
        // }

    }else if(roles==="RegisterAgent"){
      userData.append("id", null);
      userData.append("userStatus", true); 
      userData.append("businessUserId", businessUserId ? parseInt(businessUserId, 10) : null);
      userData.append("departmentId", departmentId ? parseInt(departmentId, 10) : null);
      userData.append("userNationalId", userNationalId);
      userData.append("username", username);
      userData.append("email", email);
      userData.append("phoneNumber", phoneNumber || null);
      userData.append("orgId", parseInt(orgId, 10));
      userData.append("orgAdminId", localStorage.getItem("id"));

      // Append categoriesId array properly
      if (categoriesId.length > 0) {
        categoriesId.forEach((id) => userData.append("categoriesId", id));
      } else {
        userData.append("categoriesId", null);
      }

      // Append ProfilePicture file
      if (Picture) {
        userData.append("profilePicture", Picture);
      }


    }
    
    try {
      await dispatch(addUsers(userData,roles));
      toast.success("User added successfully!");

      setBusinessUserId("");
      setUserNationalId("");
      setUsername("");
      setEmail("");
      setPhoneNumber("");
      setName("");
      setDateOfBirth("");
      setAddress("");
      setPostalCode("");
      setDateHired("");
      setSalary("");
      setPicture(null);
      setCategoriesId([]);
      setDepartmentId("");
      setdepartmentIds([]);
      setCurrentSection(0)
      setErrors({});
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setAddloading(false); 
    }
  };
  
  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 4);
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 4) % 4);
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
            <h3 className="text-color">Add New User</h3>
            <div className="stage-indicator">
                <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
                  <span>1</span>
                  <p>Role</p>
                </div>
                <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
                    <span>2</span>
                    <p>Personal Info</p>
                </div>
                <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
                    <span>3</span>
                    <p>Account Info</p>
                </div>
                <div className={`stage-item ${currentSection === 3 ? "active" : ""}`}>
                    <span>4</span>
                    <p>Contact Info</p>
                </div>
            </div>
            {currentSection === 0 && (
            <div className="org-data-div">
                <h5 className="text-color">ٌRole</h5>

                <div className="input-org">
                  <label>Role</label>
                  <select
                  value={roles}
                  onChange={(e) => setRoles(e.target.value)}
                  >
                    <option value="">Select Role</option>
                   {userRoles.includes("SuperAdmin")&& <option value="RegisterOrgAdmin">Admin</option>}
                   {(userRoles.includes("SuperAdmin")||userRoles.includes("OrgAdmin"))&& <option value="RegisterHeadManager">Head</option>}
                   {(userRoles.includes("SuperAdmin")||userRoles.includes("OrgAdmin")||userRoles.includes("HeadManager"))&& <option value="RegisterManager">Manager</option>}
                    <option value="RegisterAgent">Agent</option>
                  </select>
                </div>
                {userRoles.includes("SuperAdmin")&&<div className="input-org">
                        <label>Organization</label>
                        <select
                            value={orgId}
                            onChange={(e) => setorgId(e.target.value)}
                        >
                            <option value="">Select Organization</option>
                            {Orgs && Orgs.length > 0 ? (
                            Orgs.map((org) => (
                                <option key={org.id} value={org.id}>{org.organizationName}</option>
                            ))
                            ) : (
                            <option>No Organizations available</option>
                            )}
                        </select>
                    </div>}
                    {((userRoles.includes("SuperAdmin") || userRoles.includes("OrgAdmin"))&& roles==="RegisterHeadManager")&&<div className="input-org">
                        <label>Department (Select multiple)</label>
                        <select multiple
                            value={departmentIds}
                            onChange={handleDepChange}
                        >
                            {departments && departments.length > 0 ? (
                            departments.map((dep) => (
                                <option key={dep.id} value={dep.id}>{dep.name}</option>
                            ))
                            ) : (
                            <option>No Departments available</option>
                            )}
                        </select>
                    </div>}
               </div>
       )}
           {currentSection === 1 && (
                <div className="org-data-div">
                     <h5 className="text-color">Personal Info</h5>
                     {roles!=="RegisterAgent" &&<div className="input-org">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                        />
                    </div>}
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
                    {roles!=="RegisterAgent"&&<div className="input-org">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            placeholder="Enter Date of Birth"
                        />
                    </div>}
                    {roles!=="RegisterAgent"&&<div className="input-org">
                        <label>Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Address"
                        />
                    </div>}
                    <div className="input-org">
                        <label>Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                   
                </div>)}
            {currentSection === 2 && (
                <div className="org-data-div">
                     <h5 className="text-color">Account Info</h5>
                     {roles!=="RegisterAgent"&&<div className="input-org">
                        <label>Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Enter Postal Code"
                        />
                    </div>}
                   
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
                    {roles!=="RegisterAgent"&&<div className="input-org">
                        <label>Hirring Date</label>
                        <input
                            type="date"
                            value={dateHired}
                            onChange={(e) => setDateHired(e.target.value)}
                            placeholder="Enter Hirring Date"
                        />
                    </div>}
                    {roles!=="RegisterAgent"&&<div className="input-org">
                        <label>Salary</label>
                        <input
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Enter Salary"
                        />
                    </div>}
                    {roles==="RegisterAgent"&&
                    <div className="input-org">
                        <label>Department ID</label>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >  <option value="">Select Department</option>
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
                            </small>)}
                    </div>}

                    {roles==="RegisterAgent"&&
                    <div className="input-org">
                        <label>Categories (Select multiple)</label>
                        <select multiple value={categoriesId} onChange={handleCategoryChange}>
                            {Categories && Categories.length > 0 ? (
                            Categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                {cat.name}
                                </option>
                            ))
                            ) : (
                            <option disabled>No categories available</option>
                            )}
                        </select>
                    </div>}
                    
                    
            
                </div>
                )}
             
            {currentSection === 3 && (
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
                   
            <button className="loading-buttons"  onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }} disabled={Addloading}>
                {Addloading ? (
                <span className="loader"></span> 
              ) : (
                'Submit'
              )}</button>
            
              </div>)}
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

export default AddUser;
