import React, { useEffect, useState } from "react";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllTasks } from "../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";

function ViewDep() {
  const [DepartmentDetails, setDepartmentDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { Tasks = [] } = useSelector((state) => state.Tasks || {});

  useEffect(() => {
    if (state?.dep) {
      console.log("Received Department Data:", state.dep);
      dispatch(fetchAllTasks("", "", "", "", "", "", "", "", state.dep.id));
      setDepartmentDetails(state.dep);
    }
  }, [state, dispatch]);

  if (!DepartmentDetails) {
    return <div className="text-center mt-10 text-lg">No Department details available.</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50 my-5">
        <h2 className="check-head text-color mb-4">Department Details</h2>
        <div className="Department-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Name:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.name || "N/A"} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Profile Type:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.profileType || "N/A"} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Status:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.status || "N/A"} disabled />
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-md-4">
              <h5 className="mb-3">Contact Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Email:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.email || "N/A"} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Phone:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.phone || "N/A"} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Manager Name:</label>
                <input type="text" className="form-control form-control-sm" value={DepartmentDetails?.managerName || "N/A"} disabled />
              </div>
            </div>

            {/* Tasks Section */}
            <div className="col-md-4">
              <h5 className="mb-3">Tasks</h5>
              <div className="border p-2 rounded  bg-white" style={{ maxHeight: "150px", overflowY: "auto" }}>
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
        <button onClick={() => navigate(-1)} className="filter-btn mt-3">Back</button>
      </div>
    </div>
  );
}

export default ViewDep;