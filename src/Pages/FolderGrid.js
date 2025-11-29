import React, { useEffect, useState } from 'react';
import { FaRegFolderClosed } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiFileOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatFileSize, getFileIconByType } from '../Components/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addFolder, fetchFolders, fetchSubFolders } from '../Redux/Actions/Action';
import SidebarMenu from '../Layouts/sidemenue';
import { useNavigate } from 'react-router-dom';

const FolderGrid = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const OrgId = localStorage.getItem('orgId');
    const { Folders} = useSelector((state) => state.Folders);
    useEffect(() => {
        dispatch(fetchFolders());
    }, [dispatch]);
   
    const [showModal, setShowModal] = useState(false);
const [newFolderName, setNewFolderName] = useState("");

// Toggle modal
const toggleModal = () => {
  setShowModal(!showModal);
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

      parentFolderId:null

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
  const getDocumentIcon = (type) => {
    const iconType = getFileIconByType(type);
    switch (iconType) {
      case 'image':
        return <CiImageOn className="h-10 w-10 text-indigo-600" />;
      case 'file-text':
        return <CiFileOn className="h-10 w-10 text-green-600" />;
      case 'table':
        return <CiViewTable className="h-10 w-10 text-blue-600" />;
      default:
        return <CiFileOn className="h-10 w-10 text-gray-600" />;
    }
  };

  return (
    <div className="d-flex">
        <SidebarMenu/>
        <div className="flex flex-grow w-[80%] px-6 m-5">
          <div className="head-icon">
            <h4 className="check-head text-color">Parent Folders</h4>
            <FontAwesomeIcon
                 onClick={toggleModal}
                className="icon-edit"
                icon={faPlus}
            />
        </div>
          <div className="folders">

                {Folders.map(folder => (
                    <>
                    <div
                    key={folder.id}
                    onClick={() =>
                      navigate(`/view-folder/${folder.id}`,{ state: { folder } })
                  }
                    className="folders-container"
                    >
                        <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-lg mb-3">
                            <FaRegFolderClosed
                            className="h-10 w-10 text-indigo-800" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 text-center truncate w-full">
                            {folder.name}
                        </span>
                      
                    </div>
                    <hr/>
                    </>
                ))}

            {/* {staticDocuments.map(document => (
                <div
                key={document.id}
                //   onClick={() => setSelectedDocument(document)}
                className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg mb-3">
                    {getDocumentIcon(document.type)}
                </div>
                <span className="text-sm font-medium text-gray-900 text-center truncate w-full">
                    {document.name}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                    {formatFileSize(document.size)}
                </span>
                </div>
            ))} */}

            {Folders.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                    <FaRegFolderClosed className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No items</h3>
                <p className="mt-1 text-sm text-gray-500">
                    This folder is empty. Upload documents or create subfolders.
                </p>
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

        </div>
        <ToastContainer />
    </div>
  );
};

export default FolderGrid;
