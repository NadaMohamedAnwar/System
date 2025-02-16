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
      <div className="manage mx-auto">
        <h2 className="check-head text-color">Case Details</h2>
        <div>
          <table>
            <tbody>
              {Object.entries({
                "Title": caseDetails.title,
                "Description": caseDetails.description,
                "Case Type": caseDetails.caseType,
                "Pricing Type": caseDetails.pricingType,
                "Price": `$${caseDetails.price}`,
                "Opposing Party": caseDetails.opposingParty,
                "Opposing Lawyer": caseDetails.opposingLawyer,
                "Start Date": new Date(caseDetails.startDate).toDateString(),
                "Client ID": caseDetails.clientId,
                "Case Documents":
                  caseDetails.caseDocuments?.length > 0 ? (
                    caseDetails.caseDocuments.map((doc, index) => (
                      <div key={index}>
                        <a
                          href={`http://agentsys.runasp.net${doc.documentUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Document {index + 1}
                        </a>
                      </div>
                    ))
                  ) : (
                    "No documents available"
                  ),
              }).map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="p-3 font-medium bg-gray-100 border border-gray-300">{key}</td>
                  <td className="p-3 border border-gray-300">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => navigate(-1)} className="filter-btn">
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewCase;
