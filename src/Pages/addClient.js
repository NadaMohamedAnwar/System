import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import MapModal from '../Components/map-model';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addClient, fetchCategories, fetchOrgs } from "../Redux/Actions/Action";

function AddClient() {
  const dispatch = useDispatch();
  const [Addloading, setAddloading] = useState(false); 
  const { Categories, loading, error } = useSelector((state) => state.Categories);
  const { Orgs } = useSelector((state) => state.Orgs);
  
    useEffect(() => {
            dispatch(fetchOrgs());
        }, [dispatch]);
  
  useEffect(() => {
      dispatch(fetchCategories());
  }, [dispatch]);

  // Section 1: Account Info
  const [accountName, setAccountName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [customerType, setCustomerType] = useState(0); 
  const [categoryId, setCategoryId] = useState(""); 

  // Section 2: Contact Info
  const [contactName, setContactName] = useState("");
  const [contactMobileNumber, setContactMobileNumber] = useState("");
  const [contactAddress, setContactAddress] = useState("");

  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});

  // Section 3: Location Info
  const [latLng, setLatLng] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setlocation] = useState('');
  const [orgId, setorgId] = useState(localStorage.getItem('orgId'));
  const role= localStorage.getItem('roles')
  const getLocationName = async (lat, lng) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                format: 'json',
                lat,
                lon: lng,
            }
        });
        return response.data.display_name || 'Unknown Location';
    } catch (error) {
        console.error('Error fetching location name:', error);
        return 'Unknown Location';
    }
};
useEffect(() => {
  if (latLng) { // Check if latLng is not null
      const fetchLocationName = async () => {
          const locationName = await getLocationName(latLng.lat, latLng.lng);
          setlocation(locationName);
      };
      fetchLocationName();
  }
}, [latLng]);
const handleConfirmLocation = (latlng) => {
  setLatLng(latlng);
  setLatitude(latlng.lat);  // Use latlng directly
  setLongitude(latlng.lng); // Use latlng directly
  // console.log('Location confirmed:', latlng);
};
  // Navigation between sections
  const handleNext = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % 3);
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + 3) % 3);
  };

  const validateInputs = () => {
    let newErrors = {};

    if (!accountName || accountName.length < 1) {
      newErrors.accountName = "Account name is required.";
    }
    if (!accountAddress || accountAddress.length < 1) {
      newErrors.accountAddress = "Account address is required.";
    }
    if (!contactMobileNumber || contactMobileNumber.length < 1) {
      newErrors.contactMobileNumber = "Contact mobile number is required.";
    }
    if (!contactAddress || contactAddress.length < 1) {
      newErrors.contactAddress = "Contact address is required.";
    }
    if (latitude === null || longitude === null) {
      newErrors.location = "Location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setAddloading(true);

    const clientData = {
      id:null,
      accountName,
      accountAddress,
      customerType: parseInt(customerType,10),
      categoryId: parseInt(categoryId,10),
      contactName,
      contactMobileNumber,
      contactAddress,
      longitude,
      organizationId: parseInt(orgId, 10),
      latitude
    };

    try {
      
      await dispatch(addClient(clientData));
      toast.success("Client added successfully!");
      setAccountName("");
      setAccountAddress("");
      setCustomerType(0);
      setCategoryId("");
      setContactName("");
      setContactMobileNumber("");
      setContactAddress("");
      setErrors({});
      setCurrentSection(0);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setAddloading(false); 
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add New Client</h3>
        <div className="stage-indicator">
          <div className={`stage-item ${currentSection === 0 ? "active" : ""}`}>
            <span>1</span>
            <p>Account Info</p>
          </div>
          <div className={`stage-item ${currentSection === 1 ? "active" : ""}`}>
            <span>2</span>
            <p>Contact Info</p>
          </div>
          <div className={`stage-item ${currentSection === 2 ? "active" : ""}`}>
            <span>3</span>
            <p>Location Info</p>
          </div>
        </div>

        {/* Section 1: Account Info */}
        {currentSection === 0 && (
          <div className="org-data-div">
            <h5 className="text-color">Account Info</h5>
            <div className="input-org">
              <label>Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter Account Name"
              />
              {errors.accountName && <small className="error" style={{ color: "red" }}>{errors.accountName}</small>}
            </div>
            <div className="input-org">
              <label>Account Address</label>
              <input
                type="text"
                value={accountAddress}
                onChange={(e) => setAccountAddress(e.target.value)}
                placeholder="Enter Account Address"
              />
              {errors.accountAddress && <small className="error" style={{ color: "red" }}>{errors.accountAddress}</small>}
            </div>
            <div className="input-org">
              <label>Customer Type</label>
              <select
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
              >
                <option value="0">Business</option>
                <option value="1">Consumer</option>
                <option value="2">Merchant</option>
              </select>
            </div>
            <div className="input-org">
              <label>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value={""}>Select Category</option>
                {Categories && Categories.length > 0 ? (
                  Categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))
                ) : (
                  <option>No categories available</option>
                )}
              </select>
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
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Enter Contact Name"
              />
            </div>
            <div className="input-org">
              <label>Contact Mobile Number</label>
              <input
                type="text"
                value={contactMobileNumber}
                onChange={(e) => setContactMobileNumber(e.target.value)}
                placeholder="Enter Contact Mobile Number"
              />
              {errors.contactMobileNumber && <small className="error" style={{ color: "red" }}>{errors.contactMobileNumber}</small>}
            </div>
            <div className="input-org">
              <label>Contact Address</label>
              <input
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                placeholder="Enter Contact Address"
              />
              {errors.contactAddress && <small className="error" style={{ color: "red" }}>{errors.contactAddress}</small>}
            </div>
            {role.includes("SuperAdmin")&&
              <div className="input-org">
              <label>Organization ID</label>
              <select
                  value={orgId}
                  onChange={(e) => setorgId(e.target.value)}
              >
                  {Orgs && Orgs.length > 0 ? (
                  Orgs.map((org) => (
                      <option key={org.id} value={org.id}>{org.organizationName}</option>
                  ))
                  ) : (
                  <option>No Organizations available</option>
                  )}
              </select>
          </div>
              }
          </div>
        )}
        {currentSection === 2 && (
          <div className="org-data-div">
            <h5 className="text-color">Location Info</h5>
            <p>Location : {location || "Not Set"}</p>
            <button style={{ marginTop: "20px", width: "100%" }} onClick={() => setShowMapModal(true)}>Select Location</button>
            <button className="loading-buttons"  onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }} disabled={Addloading}>
                {Addloading ? (
                <span className="loader"></span> 
              ) : (
                'Submit'
              )}</button>
            
          </div>
        )}
        {/* Navigation Buttons */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>
         
        <ToastContainer />
        <MapModal show={showMapModal}  handleClose={() => setShowMapModal(false)}
            onConfirm={handleConfirmLocation} />
      </div>
    </div>
  );
}

export default AddClient;
