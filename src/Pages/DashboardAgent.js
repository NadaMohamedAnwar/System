// import React, { useState } from "react";
// import BarChartComponent from "../Components/BarChartComponent";
// import LineChartComponent from "../Components/LineChartComponent";
// import PieChartComponent from "../Components/PieChartComponent";
// import DashboardCss from '../Css/DashboardCss.css'

// function DashboardAgent() {
//     const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

//     const toggleSidebar = () => {
//       setSidebarCollapsed(!isSidebarCollapsed);
//     };
  
//     const data = [
//       { name: "January", value: 30 },
//       { name: "February", value: 50 },
//       { name: "March", value: 70 },
//       { name: "April", value: 90 },
//     ];
  
//     const pieData = [
//       { name: "Group A", value: 400 },
//       { name: "Group B", value: 300 },
//       { name: "Group C", value: 300 },
//       { name: "Group D", value: 200 },
//     ];
  
//     return (
//       <div className={`dashboard ${isSidebarCollapsed ? "collapsed" : ""}`}>
//         <aside className="controls">
//           <button className="toggle-button" onClick={toggleSidebar}>
//             ☰
//           </button>
//           <h3>Controls</h3>
//           <div className="control-group">
//             <label htmlFor="search">Search:</label>
//             <input type="text" id="search" placeholder="Type here..." />
//           </div>
//           <div className="control-group">
//             <label htmlFor="filter">Filter by Month:</label>
//             <select id="filter">
//               <option value="all">All Months</option>
//               <option value="jan">January</option>
//               <option value="feb">February</option>
//               <option value="mar">March</option>
//               <option value="apr">April</option>
//             </select>
//           </div>
//           <div className="control-group">
//             <label htmlFor="range">Adjust Range:</label>
//             <input type="range" id="range" min="0" max="100" />
//           </div>
//           <button className="apply-button">Apply Filters</button>
//         </aside>
//         <main className="graphs">
//           <div className="graph">
//             <h4>Bar Chart</h4>
//             <BarChartComponent data={data} />
//           </div>
//           <div className="graph">
//             <h4>Line Chart</h4>
//             <LineChartComponent data={data} />
//           </div>
//            <div className="graph">
//             <h4>Line Chart</h4>
//             <LineChartComponent data={data} />
//           </div>
//           <div className="graph">
//             <h4>Pie Chart</h4>
//             <PieChartComponent data={pieData} />
//           </div>
//         </main>
//       </div>
//     );
// }

// export default DashboardAgent;
import React, { useState } from "react";
import BarChartComponent from "../Components/BarChartComponent";
import LineChartComponent from "../Components/LineChartComponent";
import PieChartComponent from "../Components/PieChartComponent";
import DashboardCss from '../Css/DashboardCss.css'
import SidebarMenu from "../Layouts/sidemenue";

function DashboardAgent() {
    const data = [
      { name: "January", value: 30 },
      { name: "February", value: 50 },
      { name: "March", value: 70 },
      { name: "April", value: 90 },
    ];
  
    const pieData = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
    ];
  
    return (
      <div className="d-flex">
            <SidebarMenu/>
        <div className="dashboard">
          {/* <div className="controls">
            <div className="control-group">
              <label htmlFor="search">التاريخ</label>
              <input type="date" id="search" placeholder="Type here..." />
            </div>
            <div className="control-group">
              <label htmlFor="filter">اسم العامل</label>
              <select id="filter">
                <option value="all">All Months</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="filter">اسم العميل</label>
              <select id="filter">
                <option value="all">All Months</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
                <option value="apr">April</option>
              </select>
            </div>
            <button className="apply-button">تطبيق</button>
          </div> */}
          <div className="graphs">
            <div className="graph">
              <h4>Bar Chart</h4>
              <BarChartComponent data={data} />
            </div>
            <div className="graph">
              <h4>Line Chart</h4>
              <LineChartComponent data={data} />
            </div>
            <div className="graph">
              <h4>Pie Chart</h4>
              <PieChartComponent data={pieData} />
            </div>
            <div className="graph">
              <h4>Line Chart</h4>
              <LineChartComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default DashboardAgent;

