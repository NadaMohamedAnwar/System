import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assignDepartment, fetchActiveDepartments, fetchUsers } from "../Redux/Actions/Action";
import SidebarMenu from "../Layouts/sidemenue";

function AssignDep() {
  const [id, setid] = useState("");
  const [ManagerId, setManagerId] = useState("");
  const [Managers, setManagers] = useState([]);

  const dispatch = useDispatch();
  const { Departments } = useSelector((state) => state.Departments);
  const { Users } = useSelector((state) => state.Users);

  useEffect(() => {
    dispatch(fetchActiveDepartments());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (Users && Users.length > 0) {
      const managerList = Users.filter((u) => u.role === "Manager");
      setManagers(managerList);
      console.log("Managers:", managerList);
    }
  }, [Users]);

  const handleSubmit = async () => {
    try {

      if (!id || !ManagerId) {
        toast.error("Please select both Department and Manager!");
        return;
      }

      await dispatch(assignDepartment(id, ManagerId));
      toast.success("Department Assigned successfully!");

      setManagerId("");
      setid("");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error assigning department:", error);
    }
  };

  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="org-par col-sm-12 col-md-8 col-lg-6">
        <h3 className="text-color">Assign Department</h3>

        {/* Department Dropdown */}
        <div className="input-org">
          <label>Department</label>
          <select value={id} onChange={(e) => setid(e.target.value)}>
            <option value="">Select a department</option>
            {Departments?.length > 0 ? (
              Departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))
            ) : (
              <option disabled>No Departments available</option>
            )}
          </select>
        </div>

        {/* Manager Dropdown */}
        <div className="input-org">
          <label>Manager</label>
          <select value={ManagerId} onChange={(e) => setManagerId(e.target.value)}>
            <option value="">Select a manager</option>
            {Managers?.length > 0 ? (
              Managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.userName}
                </option>
              ))
            ) : (
              <option disabled>No Managers available</option>
            )}
          </select>
        </div>

        <button onClick={handleSubmit}>Assign Department</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AssignDep;
