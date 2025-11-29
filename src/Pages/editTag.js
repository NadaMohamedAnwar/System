import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  editCategory, editTag } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useParams } from "react-router-dom";


function EditTags() {
   const [editloading,seteditloading]=useState(false)
   const orgId=parseInt(localStorage.getItem("orgId"), 10)
  const [name, setname] = useState("");
  const { state } = useLocation(); 
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      if (state?.t) {
        const Tag = state.t;
        setname(Tag.name || "");
        
      }
    }, [state]);
  const handleSubmit = async () => {
    seteditloading(true)
    const tagData = {
        id,
      name,
      organizationId:orgId,
    };
    try {
      await dispatch(editTag(id,tagData));
      toast.success("Tag updated successfully!");
      setname("")
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally{
      seteditloading(false)
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Edit Tag</h3>
        <div className="input-org">
          <label>Tag Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Category Name"
          />
        </div>

        <button onClick={handleSubmit} className="loading-buttons"  disabled={editloading}>
                {editloading ? (
                <span className="loader"></span> 
              ) : (
                'Save'
              )}</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditTags;
