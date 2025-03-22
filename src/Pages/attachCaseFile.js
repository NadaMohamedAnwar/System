import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { attachCaseFile, fetchCases } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";

function AttachCaseFile() {
  const [Docloading, setDocloading] = useState(false); 
  const [file, setFile] = useState(null);
  const [CaseId, setCaseId] = useState("");
  const dispatch = useDispatch();
  const { Cases } = useSelector((state) => state.Cases);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File details:", selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file || !CaseId) {
        toast.error("Please select a case and upload a document.");
        return;
      }
      setDocloading(true);
      const formData = new FormData();
      formData.append("file", file);

      await dispatch(attachCaseFile(CaseId,formData));
      toast.success("Document attached successfully!");
      setFile(null);
      setCaseId("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setDocloading(false); 
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Attach Case Document</h3>
        <div className="input-org">
          <label>Case</label>
          <select value={CaseId} onChange={(e) => setCaseId(e.target.value)}>
            <option value="">Select Case</option>
            {Cases && Cases.length > 0 ? (
              Cases.map((Case) => (
                <option key={Case.id} value={Case.id}>
                  {Case.title}
                </option>
              ))
            ) : (
              <option>No Cases available</option>
            )}
          </select>
        </div>
        <div className="input-org">
          <label>Document</label>
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
        </div>

        <button className="loading-buttons"  onClick={handleSubmit} disabled={Docloading}>
                {Docloading ? (
                <span className="loader"></span> 
              ) : (
                'Attach'
              )}</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AttachCaseFile;
