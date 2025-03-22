import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDepartment, fetchUsers } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";

function AddDep() {
  const [name, setname] = useState("");
  const [Addloading, setAddloading] = useState(false); 
  const [description, setDescription] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [status, setStatus] = useState(true); 
  const [managerId, setManagerId] = useState(null);
  const [profileType, setProfileType] = useState("1");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [Managers, setManagers] = useState([]);
  const { Users } = useSelector((state) => state.Users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (Users && Users.length > 0) {
      const managerList = Users.filter((u) => u.role === "Manager" && u.organizationId === parseInt(sessionStorage.getItem('orgId'), 10));
      setManagers(managerList);
      // console.log("Managers:", managerList);
    }
  }, [Users]);

  const validate = () => {
    const newErrors = {};

    if (!name || name.length < 1 || name.length > 100) {
      newErrors.name = "Name is required and must be between 1 and 100 characters.";
    }
    if (!description || description.length < 1 || description.length > 500) {
      newErrors.description = "Description is required and must be between 1 and 500 characters.";
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
    validate();
  };
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    setAddloading(true);
  
    const depData = {
      name,
      description,
      email,
      phone,
      status,
      managerId: managerId || null,
      orgId: parseInt(sessionStorage.getItem('orgId'), 10),
      profileType: parseInt(profileType),
    };
  
    console.log(depData);
  
    try {
      await dispatch(addDepartment(depData));
      toast.success("Department added successfully!");
      setname("");
      setDescription("");
      setemail("");
      setphone("");
      setStatus(true);
      setManagerId(null);
      setProfileType("1");
      setErrors({});
    } catch (error) {
      toast.error(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    }finally {
      setAddloading(false); 
    }
  };
  

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add New Department</h3>
        <div className="input-org">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Department Name"
          />
          {errors.name && <p className="error" style={{color:"red"}}>{errors.name}</p>}
        </div>

        <div className="input-org">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Description"
          />
          {errors.description && <p className="error" style={{color:"red"}}>{errors.description}</p>}
        </div>

        <div className="input-org">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Email"
          />
          {errors.email && <p className="error" style={{color:"red"}}>{errors.email}</p>}
        </div>

        <div className="input-org">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Phone"
          />
          {errors.phone && <p className="error" style={{color:"red"}}>{errors.phone}</p>}
        </div>

        <div className="input-org">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value === "true")}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="input-org">
          <label>Manager ID (Optional)</label>
          <select value={managerId} onChange={(e) => setManagerId(e.target.value)}>
            <option value="">Select a manager</option>
            {Managers?.length > 0 ? (
              Managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.userName}
                </option>
              ))
            ) : (
              <option disabled>No Managers available</option>
            )}
          </select>
        </div>

        <div className="input-org">
          <label>Profile Type</label>
          <select
            value={profileType}
            onChange={(e) => setProfileType(e.target.value)}
            onBlur={handleInputBlur}
          >
            <option value="1">Sales</option>
            <option value="2">AfterSales</option>
            <option value="3">Lawyers</option>
            <option value="4">Inspection</option>
            <option value="5">Delivery</option>
            <option value="6">None</option>
          </select>
        </div>

        <button className="loading-buttons"  onClick={handleSubmit} disabled={Addloading}>
                {Addloading ? (
                <span className="loader"></span> 
              ) : (
                'Submit'
              )}</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddDep;
