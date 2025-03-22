
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editAgent, editUsers } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useParams } from "react-router-dom";

function EditAgent() {
  const [Agentloading, setAgentloading] = useState(false); 
  const [businessUserId, setbusinessUserId] = useState("");
  const [userNationalId, setuserNationalId] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [id, setid] = useState("");
  const [type, settype] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { state } = useLocation(); 
  const { role } = useParams();
  const [userRoles, setUserRoles] = useState();

  useEffect(() => {
      if (state?.User) {
        const User = state.User;
        setbusinessUserId(User.businessUserId ||"")
        setuserNationalId(User.nationalId ||"")
        setemail(User.email||"")
        setphoneNumber(User.phone||"")
        setid(User.id)
        setUserRoles(User.role)

      }
    }, [state]);

  const validate = () => {
    const newErrors = {};

    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (phoneNumber && !/^\+?\d{7,15}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format.";
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
   setAgentloading(true)
    const userData = {
      id,
      businessUserId:businessUserId,
      userNationalId:userNationalId,
      email:email,
      phoneNumber:phoneNumber,
    };

    try {
      await dispatch(editAgent(userData));
      toast.success("User updated successfully!");
      // Reset fields
      
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally{
      setAgentloading(false)
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Edit User</h3>
        <div className="input-org">
          <label>Business User Id</label>
          <input
            type="text"
            value={businessUserId}
            onChange={(e) => setbusinessUserId(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Business User Id "
          />
         
        </div>

        <div className="input-org">
          <label>National Id</label>
          <textarea
            value={userNationalId}
            onChange={(e) => setuserNationalId(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter National Id"
          />
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
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            onBlur={handleInputBlur}
            placeholder="Enter Phone"
          />
          {errors.phoneNumber && <p className="error" style={{color:"red"}}>{errors.phoneNumber}</p>}
        </div>


        <button onClick={handleSubmit} className="loading-buttons"  disabled={Agentloading}>
                {Agentloading ? (
                <span className="loader"></span> 
              ) : (
                'Save'
              )}</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditAgent;
