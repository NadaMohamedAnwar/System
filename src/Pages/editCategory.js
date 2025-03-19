import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  editCategory } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";
import { useLocation, useParams } from "react-router-dom";


function EditCategory() {
  const [name, setname] = useState("");
  const { state } = useLocation(); 
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      if (state?.Category) {
        const Category = state.Category;
        // console.log(Category)
        setname(Category.name || "");
        
      }
    }, [state]);
  const handleSubmit = async () => {
    try {
      await dispatch(editCategory(id,name));
      toast.success("Category updated successfully!");
      setname("")
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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

        <button onClick={handleSubmit}>Edit Tag</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EditCategory;
