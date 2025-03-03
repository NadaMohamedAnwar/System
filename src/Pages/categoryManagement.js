import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../Layouts/sidemenue";
import { deleteCategory, deleteOrg, fetchCategories, fetchOrgs, filterCategory } from "../Redux/Actions/Action";

function CategoryManagement() {
    const dispatch = useDispatch();
    const { FilterCategories} = useSelector((state) => state.Categories);
    const [name, setname] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Category?")) {
            dispatch(deleteCategory(id))
                .then(() => toast.success("Category deleted successfully"))
                .catch((err) => toast.error("Failed to delete Category: " + err.message));
        }
    };
    const handleFilter = () => {
            dispatch(filterCategory(name));
        };
        
        const resetData=()=>{
        dispatch(fetchCategories());
        setname("")
        }
    return (
        <div className="d-flex">
            <SidebarMenu/>
            <div className="manage mx-auto">
                
                <div>
                    <div className="filter-div">
                        <div className="input-org-filter">
                            <label>Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}  
                            />
                        </div>
                        <button className="filter-btn" onClick={handleFilter}>Filter</button>
                        <button className="filter-btn" onClick={resetData}>Reset</button>
                    </div>
                    <div className="table-container">
                        <div className="head-icon">
                            <h4 className="check-head text-color">Tags:{FilterCategories.length}</h4>
                            <FontAwesomeIcon
                                onClick={() => navigate("/add-category")}
                                className="icon-edit"
                                icon={faPlus}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tag Name</th>
                                    {/* <td>Actions</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {FilterCategories.length > 0 ? (
                                    FilterCategories.map((Category) => (
                                        <tr key={Category.id}>
                                            <td>{Category.name}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="icon-edit"
                                                    icon={faEdit}
                                                    onClick={() =>
                                                        navigate(`/edit-category/${Category.id}`, { state: { Category } })
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    className="icon-del"
                                                    icon={faTrash}
                                                    onClick={() => handleDelete(Category.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No Tags found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default CategoryManagement;
