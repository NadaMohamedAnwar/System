import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCategory } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";


function AddCategory() {
  const [name, setname] = useState("");
   const [Addloading, setAddloading] = useState(false); 
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setAddloading(true);
    try {
      if (!name) {
        toast.error("Please fill all data.");
        return;
      }
  
      await dispatch(addCategory(name));
      toast.success("Category Added successfully!");
      setname("")
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }finally {
      setAddloading(false); 
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Add Tag</h3>
        <div className="input-org">
          <label>Tag Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Category Name"
          />
        </div>

        <button className="loading-buttons"  onClick={handleSubmit} disabled={Addloading}>
                {Addloading ? (
                <span className="loader"></span> 
              ) : (
                'Add Tag'
              )}</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddCategory;
