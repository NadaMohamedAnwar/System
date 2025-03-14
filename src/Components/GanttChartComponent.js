import React, { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";

const GanttChartComponent = ({ tasks }) => {
  const ganttRef = useRef(null);

  useEffect(() => {
    if (ganttRef.current && tasks.length > 0) {
      new Gantt(ganttRef.current, tasks);
    }
  }, [tasks]);

  return <div ref={ganttRef}></div>;
};

export default GanttChartComponent;
