import React, { useEffect, useState } from "react";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useNavigate } from "react-router-dom";

function ViewOrg() {
  const [orgDetails, setorgDetails] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.org) {
      setorgDetails(state.org);
    }
  }, [state]);

  if (!orgDetails) {
    return <div className="text-center mt-10 text-lg">Loading Organization details...</div>;
  }

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="manage mx-auto p-4 w-75 my-5">
        <h2 className="check-head text-color mb-4">Organization Details</h2>
        <div className="org-info border p-4 rounded shadow bg-light">
          <div className="row">
            
            {/* General Information */}
            <div className="col-md-4">
              <h5 className="mb-3">General Information</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Organization Name:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.organizationName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Organization Type:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.organizationType} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Organization Status:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.organizationStatus ? "Active" : "Inactive"} disabled />
              </div>
            </div>

            {/* Financial Details */}
            <div className="col-md-4">
              <h5 className="mb-3">Financial Details</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Bank Account:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.bankAccount} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Financial Limit:</label>
                <input type="text" className="form-control form-control-sm" 
                  value={`${orgDetails.financialLimitFrom} - ${orgDetails.financialLimitTo}`} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Organization Financial ID:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.organizationFinancialId} disabled />
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-md-4">
              <h5 className="mb-3">Primary Contact</h5>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Contact Name:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.primaryContactName} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Email:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.primaryContactEmail} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Phone:</label>
                <input type="text" className="form-control form-control-sm" value={orgDetails.primaryContactPhone} disabled />
              </div>
              <div className="mb-2 d-flex align-items-center gap-2">
                <label className="form-label w-50 small-label">Address:</label>
                <textarea className="form-control form-control-sm" value={orgDetails.primaryContactAddress} disabled rows="2"></textarea>
              </div>
            </div>

          </div>
        </div>
        <button onClick={() => navigate(-1)} className="filter-btn">Back</button>
      </div>
    </div>
  );
}

export default ViewOrg;
