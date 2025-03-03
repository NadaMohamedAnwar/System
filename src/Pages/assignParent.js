import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Layouts/sidemenue";
import { useDispatch, useSelector } from "react-redux";
import { assignCaseToParent, fetchCases } from "../Redux/Actions/Action";

function AssignParent() {
  const { Cases } = useSelector((state) => state.Cases);
  const [CaseId, setCaseId] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [RevelantCases, setRevelantCases] = useState([]);
  const [linkedCaseId, setLinkedCaseId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  useEffect(() => {
    console.log("Cases Data:", Cases); // Check if Cases is available
    
    if (CaseId && Cases?.length > 0) {
      const foundCase = Cases.find((c) => String(c.id) === String(CaseId)) || null;
      
      console.log("CaseId:", CaseId); // Debugging CaseId
      console.log("Found Case:", foundCase); // Debugging foundCase
      
      setSelectedCase(foundCase);
  
      if (foundCase) {
        setRevelantCases(
          Cases.filter((c) => c.clientId === foundCase.clientId && c.id !== foundCase.id)
        );
      } else {
        setRevelantCases([]);
      }
    }
  }, [CaseId, Cases]);
  
  

  const handleAssignParent = async () => {
    try {
      await dispatch(assignCaseToParent(CaseId, linkedCaseId));
      toast.success("Case Assigned successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h5 className="text-color">Assign Relevant</h5>

        <div className="input-org">
          <label>Case</label>
          <select value={CaseId} onChange={(e) => setCaseId(e.target.value)}>
            <option value="">Select Case</option>
            {Cases.length > 0 ? (
              Cases.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)
            ) : (
              <option>No Cases available</option>
            )}
          </select>
        </div>

        <div className="input-org">
          <label>Relevant Case</label>
          <select value={linkedCaseId} onChange={(e) => setLinkedCaseId(e.target.value)}>
            <option value="">Select Case</option>
            {RevelantCases.length > 0 ? (
              RevelantCases.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)
            ) : (
              <option>No Cases available</option>
            )}
          </select>
        </div>

        <button onClick={handleAssignParent} style={{ marginTop: "20px", width: "100%" }}>
          Assign Relevant
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default AssignParent;
