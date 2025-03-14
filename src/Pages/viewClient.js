import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SidebarMenu from "../Layouts/sidemenue";
import { fetchAllTasks } from "../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";

function ViewClient() {
  const [ClientDetails, setClientDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const{id}=useParams();

  const { Tasks = [] } = useSelector((state) => state.Tasks || {});
  useEffect(() => {
    if (state?.Client) {
      console.log("Received Client Data:", state.Client);
      dispatch(fetchAllTasks(id, "", "", "", "", "", "", "",[]));
      setClientDetails(state.Client);
    }
  }, [state]);

  if (!ClientDetails) {
    return <div className="text-center mt-10 text-lg">No Client details available.</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50 my-5">
        <h2 className="check-head text-color mb-4">Client Details</h2>
        <div className="Client-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Account Name:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.accountName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Category ID:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.categoryId} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Customer Type:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.customerType} disabled />
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-md-4">
              <h5 className="mb-3">Contact Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Contact Name:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.contactName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Contact Address:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.contactAddress} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Mobile Number:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.contactMobileNumber} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Account Address:</label>
                <input type="text" className="form-control form-control-sm" value={ClientDetails.accountAddress} disabled />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="col-md-4">
            <h5 className="mb-3">Tasks</h5>
            <div className="border p-2 rounded  bg-white" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {Tasks.length > 0 ? (
                Tasks.map((task) => (
                    <div key={task.id} className="mb-2 p-2 border-bottom" onClick={() =>
                        navigate(`/view-task/${task.id}`, { state: { task } })
                    }
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

export default ViewClient;
