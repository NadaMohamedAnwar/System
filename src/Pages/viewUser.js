import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarMenu from "../Layouts/sidemenue";
import { fetchAllTasks } from "../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";

function ViewUser() {
  const [UserDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { Tasks = [] } = useSelector((state) => state.Tasks || {});

  useEffect(() => {
    if (state?.User) {
      console.log("Received User Data:", state.User);
      setUserDetails(state.User);

      if (state.User.role === "Agent") {
        dispatch(fetchAllTasks("", "", "", "", "", "", state.User.id, "", []));
      } else {
        dispatch(fetchAllTasks("", "", "", "", "", "", "", state.User.id, []));
      }
    }
  }, [state, dispatch]);

  if (!UserDetails) {
    return <div className="text-center mt-10 text-lg">No User details available.</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50 my-5">
        <h2 className="check-head text-color mb-4">User Details</h2>
        
        <div className="User-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
            <h5 className="mb-3">General Information</h5>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Username:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.userName} disabled />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Role:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.role} disabled />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">National ID:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.nationalId} disabled />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Organization:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.organization} disabled />
            </div>
            </div>

            {/* Contact Information */}
            <div className="col-md-4">
            <h5 className="mb-3">Contact Information</h5>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Email:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.email} disabled />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Phone:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.phone} disabled />
            </div>
            <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Is Active:</label>
                <input type="text" className="form-control form-control-sm" value={UserDetails.isActive ? "Yes" : "No"} disabled />
            </div>
            </div>


            {/* Tasks Section */}
            <div className="col-md-4">
              <h5 className="mb-3">Tasks</h5>
              <div className="border p-2 rounded bg-white" style={{ maxHeight: "150px", overflowY: "auto" }}>
                {Tasks.length > 0 ? (
                  Tasks.map((task) => (
                    <div key={task.id} 
                         className="mb-2 p-2 border-bottom task-card" 
                         onClick={() => navigate(`/view-task/${task.id}`, { state: { task } })}
                         style={{ cursor: "pointer", transition: "0.3s", borderRadius: "5px" }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}>
                      <strong>{task.taskName}</strong>
                      <p className="m-0 text-muted">Assigned to: {task.assignedToUserName}</p>
                      <p className="m-0">Priority: {task.priorityName} | Status: {task.statusName}</p>
                      <p className="m-0">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="m-0 text-muted">No tasks available</p>
                )}
              </div>
            </div>

          </div>
        </div>
        
        <button onClick={() => navigate(-1)} className="filter-btn">Back</button>
      </div>
    </div>
  );
}

export default ViewUser;
