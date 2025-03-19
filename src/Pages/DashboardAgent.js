
import React, { useEffect, useState } from "react";
import BarChartComponent from "../Components/BarChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import SidebarMenu from "../Layouts/sidemenue";
import DashboardCss from "../Css/DashboardCss.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveDepartments, fetchCasesReport, fetchClients, fetchTaskscount, fetchTasksReport, fetchUsers } from "../Redux/Actions/Action";

function DashboardAgent() {
 
  const dispatch = useDispatch();
  const [departmentId, setdepartmentId] = useState("");
  const [AgentId, setAgentId] = useState("");
  const { Departments } = useSelector((state) => state.Departments);
  const { Users } = useSelector((state) => state.Users);
  const [clientId, setClientId] = useState("");
  const { Clients } = useSelector((state) => state.Clients);
  const { ReportTaskData,TaskCount } = useSelector((state) => state.Tasks);
  const { ReportCasesData } = useSelector((state) => state.Cases);
  const [Agents, setAgents] = useState([]);
  const [FromDate, setFromDate] = useState(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return oneMonthAgo.toISOString().split("T")[0]; 
  });
  const [ToDate, setToDate] =  useState(() => {
    return new Date().toISOString().split("T")[0]; 
  });
  const [orgId, setorgId] = useState(sessionStorage.getItem("orgId"));
  useEffect(() => {
      dispatch(fetchActiveDepartments(orgId));
      dispatch(fetchUsers());
      dispatch(fetchClients());
      dispatch(fetchTaskscount())
      dispatch(fetchTasksReport(FromDate,ToDate,"","",""))
      dispatch(fetchCasesReport(FromDate,ToDate,"","",""))
  }, [dispatch]);

  useEffect(() => {
        if (Users && Users.length > 0) {
          const agentList = Users.filter((u) => u.role === "Agent");
          setAgents(agentList);
          // console.log("Agents:", agentList);
        }
      }, [Users]);

 const handleFilter = () => {
  // console.log(FromDate,ToDate,departmentId,clientId,AgentId)
  dispatch(fetchTasksReport(FromDate,ToDate,departmentId,clientId,AgentId))
  dispatch(fetchCasesReport(FromDate,ToDate,departmentId,clientId,AgentId))
  };
  const resetData=()=>{
    const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const formattedFromDate = oneMonthAgo.toISOString().split("T")[0]; // YYYY-MM-DD

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    setFromDate(formattedFromDate);
    setToDate(today);
    setAgentId("")
    setClientId("")
    setdepartmentId("")
    // console.log(FromDate,ToDate,departmentId,clientId,AgentId)
    dispatch(fetchTasksReport(formattedFromDate, today, "", "", ""));
    dispatch(fetchCasesReport(formattedFromDate, today, "", "", ""));
   
  }
  // useEffect(()=>{
  //   console.log(ReportTaskData,ReportCasesData,TaskCount)
  // },[ReportTaskData,ReportCasesData,TaskCount])
  return (
    <div className="d-flex">
      <SidebarMenu />
      <div className="dashboard">
        {/* Filters Section */}
        <div className="filter-div">
          <div className="input-org-filter">
            <label>Date From</label>
            <input type="date" name="dateFrom" value={FromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="input-org-filter">
            <label>Date To</label>
            <input type="date" name="dateTo" value={ToDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="input-org-filter">
            <label>Department</label>
            <select
                value={departmentId}
                onChange={(e) => setdepartmentId(e.target.value)}
            >   
                <option value="">All Departments</option>
                {Departments && Departments.length > 0 ? (
                Departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>{dep.name}</option>
                ))
                ) : (
                <option>No Departments available</option>
                )}
            </select>
            </div>
            <div className="input-org-filter">
              <label>Agents</label>
              <select value={AgentId} onChange={(e) => setAgentId(e.target.value)}>
                  <option value="">All Agents</option>
                  {Agents?.length > 0 ? (
                  Agents.map((a) => (
                      <option key={a.id} value={a.id}>
                      {a.userName}
                      </option>
                  ))
                  ) : (
                  <option disabled>No Agents available</option>
                  )}
              </select>
          </div>
          <div className="input-org-filter">
            <label>Client</label>
            <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
            >
                <option value="">All Clients</option>
                {Clients && Clients.length > 0 ? (
                Clients.map((client) => (
                    <option key={client.id} value={client.id}>{client.contactName}</option>
                ))
                ) : (
                <option>No Clients available</option>
                )}
            </select>
          </div>
          <button className="filter-btn" onClick={handleFilter}>Filter</button>
          <button className="filter-btn" onClick={resetData}>Reset</button>
        </div>

        {/* KPIs Section */}
        
        {/* Graphs Section */}
        <div className="graphs">
          <div className="graph">
            <h4>Task Status Breakdown</h4>
            <BarChartComponent data={ReportTaskData} />
          </div>
          <div className="graph">
            <h4>Cases Status Breakdown</h4>
            <BarChartComponent data={ReportCasesData} />
          </div>
          <div className="graph">
            <h4>Total & Overdue Tasks</h4>
            <PieChartComponent data={TaskCount} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAgent;


