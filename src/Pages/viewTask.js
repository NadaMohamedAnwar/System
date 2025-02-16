import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { editCases, fetchClients } from "../Redux/Actions/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ViewTask() {
    const [TaskDetails, setTaskDetails] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();
  
    useEffect(() => {
      if (state?.Task) {
        setTaskDetails(state.Task);
      }
    }, [state]);
  
    if (!TaskDetails) {
      return <div className="text-center mt-10 text-lg">Loading case details...</div>;
    }
  
    return (
        <div className="d-flex">
        <SidebarMenu/>
        <div className="manage mx-auto">
          <h2 className="check-head text-color">Task Details</h2>
          <div>
          <table >
            <tbody>
           
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Title</td>
                    <td className="p-3 border">{TaskDetails.title}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Description</td>
                    <td className="p-3 border">{TaskDetails.description}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Priority</td>
                    <td className="p-3 border">{TaskDetails.priority}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Status</td>
                    <td className="p-3 border">{TaskDetails.status}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Assigned To</td>
                    <td className="p-3 border">{TaskDetails.assignedTo ?? "N/A"}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Department ID</td>
                    <td className="p-3 border">{TaskDetails.departmentId}</td>
                </tr>
                <tr>
                    <td className="p-3 font-medium bg-gray-100 border">Due Date</td>
                    <td className="p-3 border">{new Date(TaskDetails.dueDate).toLocaleString()}</td>
                </tr>
                


            </tbody>
          </table>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="filter-btn"
          >
            Back
          </button>
        </div>
      </div>
    );
}

export default ViewTask;
