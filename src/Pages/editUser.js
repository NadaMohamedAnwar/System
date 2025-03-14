import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUsers } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useParams } from "react-router-dom";

function EditUser() {
  const [id, setId] = useState("");
  const [businessUserId, setBusinessUserId] = useState("");
  const [userNationalId, setUserNationalId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const { state } = useLocation(); 
  const { role } = useParams();

  useEffect(() => {
    if (state?.User) {
      const User = state.User;
      console.log(state.User)
      setId(User.id);
      setBusinessUserId(User.businessUserId || "");
      setUserNationalId(User.nationalId || "");
      setEmail(User.email || "");
      setPhoneNumber(User.phone || "");
      setName(User.name || "");
      setDateOfBirth(User.dateOfBirth || "");
      setAddress(User.address || "");
      setPostalCode(User.postalCode || "");
      setSalary(User.salary || "");
    }
  }, [state]);

  const validate = () => {
    const newErrors = {};

    if (!id) newErrors.id = "ID is required.";
    if (!name) newErrors.name = "Name is required.";
    if (!address) newErrors.address = "Address is required.";
    
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (phoneNumber && !/^\+?\d{7,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const userData = {
      id,
      businessUserId,
      userNationalId,
      email,
      phoneNumber,
      name,
      dateOfBirth,
      address,
      postalCode,
      salary: parseFloat(salary) || 0, 
    };

    try {
      await dispatch(editUsers(userData,id));
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Edit User</h3>

        <div className="input-org">
          <label>ID *</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
            required
          />
          {errors.id && <p className="error" style={{ color: "red" }}>{errors.id}</p>}
        </div>

        <div className="input-org">
          <label>Business User Id</label>
          <input
            type="text"
            value={businessUserId}
            onChange={(e) => setBusinessUserId(e.target.value)}
            placeholder="Enter Business User Id"
          />
        </div>

        <div className="input-org">
          <label>National Id</label>
          <input
            type="text"
            value={userNationalId}
            onChange={(e) => setUserNationalId(e.target.value)}
            placeholder="Enter National Id"
          />
        </div>

        <div className="input-org">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          {errors.email && <p className="error" style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div className="input-org">
          <label>Phone</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter Phone"
          />
          {errors.phoneNumber && <p className="error" style={{ color: "red" }}>{errors.phoneNumber}</p>}
        </div>

        <div className="input-org">
          <label>Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
          {errors.name && <p className="error" style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div className="input-org">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="input-org">
          <label>Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            required
          />
          {errors.address && <p className="error" style={{ color: "red" }}>{errors.address}</p>}
        </div>

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
          <label>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter Salary"
          />
        </div>

        <button onClick={handleSubmit}>Edit User</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditUser;
