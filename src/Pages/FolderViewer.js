
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addFile, addFolder, fetchFolderContents } from '../Redux/Actions/Action';
import SidebarMenu from '../Layouts/sidemenue';
import { FaRegFolderClosed } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";

const FolderViewer = () => {
  const dispatch = useDispatch();
  const { folder, subfolders, files, loading, error } = useSelector((state) => state.Folders);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [FolderName, setFolderName] = useState(null);
  const{id}=useParams();
  const OrgId = localStorage.getItem('orgId');
  const { state } = useLocation();
  
    useEffect(() => {
      if (state?.folder) {
        setFolderName(state.folder.name);
      }
    }, [state]);
  useEffect(() => {
  
    setCurrentFolderId(id)
    
  }, [id]);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showModal2, setShowModal2] = useState(false);
  const [newfileDesc, setNewfileDesc] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // console.log("File details:", selectedFile);
    }
  };
  
  // Toggle modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  };
  
  // Handle form submission (you can dispatch an action here)
  
    
  const handleAddFolder = async () => {
      if (!newFolderName) {
        toast.error("Please enter the folder name before submitting.");
        return;
      }
     
      const folderData = {
        folderName:newFolderName,
  
        organizationId:parseInt(OrgId,10),
  
        parentFolderId:id,
  
      };
  
      try {
        await dispatch(addFolder(folderData));
        toast.success("Folder Created successfully!");
        setShowModal(false);
      setNewFolderName(""); 
      } catch (error) {
        toast.error("An error occurred. Please try again.",error);
      }
    };
    const handleAddFile = async () => {
      if (!file || !newfileDesc) {
        toast.error("Please fill all data before submitting.");
        return;
      }
     
      const formData = new FormData();
      formData.append("FolderId", id);
      formData.append("File", file);
      formData.append("Description", newfileDesc);
  
      try {
        await dispatch(addFile(formData));
        toast.success("File Added successfully!");
        setShowModal2(false);
        setFile(null)
        setNewfileDesc(""); 
      } catch (error) {
        toast.error("An error occurred. Please try again.",error);
      }
    };
  // Fetch the folder contents when the component mounts or the folderId changes
  useEffect(() => {
    if (currentFolderId) {
      dispatch(fetchFolderContents(currentFolderId));
    }
  }, [dispatch, currentFolderId]);

  // Handle folder click to show its contents
  const handleFolderClick = (folderId) => {
    setCurrentFolderId(folderId);
  };

  // Function to open documents in a new tab
  const openDocument = (documentUrl) => {
    window.open(documentUrl, '_blank');
  };

  return (
    <div className="d-flex">
        <SidebarMenu/>
            <div className="manage-folders mx-auto">
        <div className="head-button">
          <h4 className="check-head text-color">{FolderName}</h4>
          <div>
            <button onClick={toggleModal}>Create Folder</button>
            <button  onClick={toggleModal2} style={{ marginLeft: "10px" }}>
              Add File
            </button>
          </div>
        </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {folder && (
        <div className="folder-item">
          <h3>{folder.name}</h3>
          <div className="subfolders">
            
            {subfolders.length > 0 ? (
              subfolders.map((subfolder) => (
                <div className='sub-item' key={subfolder.id}>
                  <FaRegFolderClosed size={40} color="#0078d7"/>
                  <h5 onClick={() => handleFolderClick(subfolder.id)}>{subfolder.name}</h5>
                </div>
              ))
            ) : (
              <p>No subfolders available.</p>
            )}
          </div>
          <div className="documents">
           
            {files.length > 0 ? (
              files.map((file) => (
                <div className='file-item' key={file.id}>
                  <CiFileOn size={40} color="#3c3c3c"/>
                  <button onClick={() => openDocument(file.url)}>{file.name}</button>
                </div>
              ))
            ) : (
              <p>No documents available.</p>
            )}
          </div>
        </div>
      )}
    </div>
     {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Add New Folder</h2>
                  <input
                    type="text"
                    placeholder="Enter folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  <div className="modal-buttons">
                    <button onClick={toggleModal}>Cancel</button>
                    <button onClick={handleAddFolder}>Add</button>
                  </div>
                </div>
              </div>
            )}
            {showModal2 && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Add New file</h2>
                  <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
                  <textarea
                    type="text"
                    placeholder="Enter Description"
                    value={newfileDesc}
                    onChange={(e) => setNewfileDesc(e.target.value)}
                  />
                  <div className="modal-buttons">
                    <button onClick={toggleModal2}>Cancel</button>
                    <button onClick={handleAddFile}>Add</button>
                  </div>
                </div>
              </div>
            )}
            <ToastContainer />
    </div>
  );
};

export default FolderViewer;
