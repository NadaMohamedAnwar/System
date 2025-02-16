import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addServices } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";


function AddService() {
  const [name, setname] = useState("");
  const [profile, setprofile] = useState("1");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validateInputs = () => {
    let newErrors = {};

    if (!name || name.length < 1 || name.length > 50) {
      newErrors.name = "Service name must be between 1 and 50 characters.";
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
    
        const ServicesData = {
          name,
          profile:parseInt(profile),
        };
    try {
      await dispatch(addServices(ServicesData));
      toast.success("Service Added successfully!");
      setname("")
      setprofile("1")
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add Service</h3>
        <div className="input-org">
          <label>Service Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Service Name"
          />
          {errors.name && <small className="error" style={{color:"red"}}>{errors.name}</small>}
        </div>
        <div className="input-org">
          <label>Profile Type</label>
          <select
            value={profile}
            onChange={(e) => setprofile(e.target.value)}
          >
            <option value="1">Sales</option>
            <option value="2">AfterSales</option>
            <option value="3">Lawyers</option>
            <option value="4">Inspection</option>
            <option value="5">Delivery</option>
            <option value="6">None</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Add Service</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddService;
