import React, { useEffect, useState } from "react";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useNavigate } from "react-router-dom";

function ViewTask() {
  const [TaskDetails, setTaskDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.task) {
      setTaskDetails(state.task);
    }
  }, [state]);

  if (!TaskDetails) {
    return <div className="text-center mt-10 text-lg">Loading task details...</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-75">
        <h2 className="check-head text-color mb-4">Task Details</h2>
        <div className="task-info border p-4 rounded shadow bg-light">
          <div className="row">
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Task Name:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.taskName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Assigned To:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.assignedToUserName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Client:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.clientName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Created By:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.createdByUserName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Department:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.departmentName} disabled />
              </div>
            </div>

            {/* Task Details */}
            <div className="col-md-4">
              <h5 className="mb-3">Task Details</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Priority:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.priorityName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Status:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.statusName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Service:</label>
                <input type="text" className="form-control form-control-sm" value={TaskDetails.serviceName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Description:</label>
                <textarea className="form-control form-control-sm" value={TaskDetails.description} disabled rows="3"></textarea>
              </div>
            </div>

            {/* Date & Duration */}
            <div className="col-md-4">
              <h5 className="mb-3">Date & Duration</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Start At:</label>
                <input type="text" className="form-control form-control-sm" value={new Date(TaskDetails.startAt).toLocaleString()} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Due Date:</label>
                <input type="text" className="form-control form-control-sm" value={new Date(TaskDetails.dueDate).toLocaleString()} disabled />
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">Back</button>
      </div>
    </div>
  );
}

export default ViewTask;
