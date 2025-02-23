import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarMenu from "../Layouts/sidemenue";

function ViewCase() {
  const [caseDetails, setCaseDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.Case) {
      setCaseDetails(state.Case);
      console.log(caseDetails)
    }
  }, [state]);
  useEffect(() => {
    
      console.log(caseDetails)
    
  }, [caseDetails]);

  if (!caseDetails) {
    return <div className="text-center mt-10 text-lg">No case details available.</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-50">
        <h2 className="check-head text-color mb-4">Case Details</h2>
        <div className="case-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Title:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.title} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Case Type:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.casetype} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Client ID:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.clientId} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Case Status:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.caseStatus} disabled />
              </div>
            </div>

            {/* Case Details */}
            <div className="col-md-4">
              <h5 className="mb-3">Case Details</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Opposing Party:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.opposingParty} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Opposing Lawyer:</label>
                <input type="text" className="form-control form-control-sm" value={caseDetails.opposingLawyer} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Price:</label>
                <input type="text" className="form-control form-control-sm" value={`$${caseDetails.price}`} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label">Description:</label>
                <textarea className="form-control form-control-sm" value={caseDetails.description} disabled rows="3"></textarea>
              </div>
            </div>

            {/* Date & Documents */}
            <div className="col-md-4">
              <h5 className="mb-3">Date & Documents</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50">Start Date:</label>
                <input type="text" className="form-control form-control-sm" value={new Date(caseDetails.startDate).toLocaleDateString()} disabled />
              </div>
              <div className="mb-2">
                <label className="form-label">Case Documents:</label>
                <div className="border p-2 rounded bg-white" style={{ minHeight: "40px" }}>
                  {caseDetails.caseDocuments.length > 0 ? (
                    caseDetails.caseDocuments.map((doc, index) => (
                      <div key={doc.id} className="text-truncate">
                        
                        <a href={`http://agentsys.runasp.net${doc.documentUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary ms-1">
                        <strong>{doc.documentName}</strong>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="m-0 text-muted">No documents available</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">Back</button>
      </div>
    </div>
  );
}

export default ViewCase;