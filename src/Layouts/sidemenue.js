import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FaChevronDown } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import logo from '../Images/Codeverse_FinalLogo_Negative.svg';
import { RxDashboard } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { VscOrganization } from "react-icons/vsc";
import { FcDepartment } from "react-icons/fc";
import { MdAssignmentInd } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaServicestack } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";

const SidebarMenu = () => {
    const [open, setOpen] = useState(true);
    const [ClientOpen, setClientOpen] = useState(false);
    const [AgentOpen, setAgentOpen] = useState(false);
    const [TaskOpen, setTaskOpen] = useState(false);
    const [CaseOpen, setCaseOpen] = useState(false);
    const [OrganizationOpen, setOrganizationOpen] = useState(false);
    const [serviceOpen, setserviceOpen] = useState(false);
    const [CategoryOpen, setCategoryOpen] = useState(false);
    const [DepartmentOpen, setDepartmentOpen] = useState(false); 
    const userRoles = JSON.parse(sessionStorage.getItem('roles'));
    const navigate = useNavigate();
    const handlelogout = e => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/');
    
      };
    return (
        <div
            className={`bg-dark text-white ${open ? "col-sm-4 col-md-3 col-lg-2" : "col-1"} vh-100 p-3 position-relative transition-width`}
            style={{ transition: "width 0.3s" }}
        >
            {/* Toggle Button */}
            <TbLayoutSidebarLeftCollapse
                className="position-absolute top-0 end-0 my-3 cursor-pointer"
                size={24}
                onClick={() => setOpen(!open)}
            />
            
            {/* Logo and Title */}
            <div className="d-flex align-items-center my-4">
                <img
                    src={logo}
                    alt="Logo"
                    className={`rounded-circle ${open ? "me-3" : ""} 
                    ${open ? "" : "d-none d-sm-inline"} `} 
                    style={{ width: "40px", height: "40px" }}
                />
                {open && <h2 className="fs-4 m-0">AgentApp</h2>}
            </div>
            
            {/* Menu Items */}
            <ul className="list-unstyled">
                
                <li className="mb-3 fs-6">
                    <NavLink
                        to="/dashboard-agent"
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                        style={{ fontSize: "0.75rem" }}
                    >
                        <RxDashboard  size={15} className="me-2" />
                        {open && <span>Dashboard</span>}
                    </NavLink>
                </li>
                <li className="mb-3 fs-6">
                    <NavLink
                        to="/schduel"
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                        style={{ fontSize: "0.75rem" }}
                    >
                        <GrSchedule  size={15} className="me-2" />
                        {open && <span>Scheduel</span>}
                    </NavLink>
                </li>

                {/* Dropdown Menu for Org Management */}
                {userRoles.includes("SuperAdmin") &&(<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setOrganizationOpen(!OrganizationOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: OrganizationOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}}/>
                        {open && <span>Org Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {OrganizationOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/organizations"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <VscOrganization  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Organizations</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-org"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Organization</span>}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
                )}
                {/* Dropdown Menu for Services Management */}
                {userRoles.includes("SuperAdmin") &&(<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setserviceOpen(!serviceOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: serviceOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}}/>
                        {open && <span>Service Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {serviceOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/services"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <FaServicestack  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Services</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-service"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Service</span>}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
                )}
                 {/* Dropdown Menu for Category Management */}
                {userRoles.includes("SuperAdmin") &&(<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setCategoryOpen(!CategoryOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: CategoryOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}} />
                        {open && <span>Tag Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {CategoryOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/categories"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <VscOrganization  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Tags</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-category"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Tag</span>}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
                )}
                {/* Dropdown Menu for dep Management */}
                {userRoles.includes("OrgAdmin") &&(<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setDepartmentOpen(!DepartmentOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: DepartmentOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}}/>
                        {open && <span>Departements Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {DepartmentOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/active-departments"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <FcDepartment  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Active Departments</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/inactive-departments"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <FcDepartment  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>InActive Departments</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/assign-department"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <MdAssignmentInd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Assign Department</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-department"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light fs-7"
                                >
                                    <MdLibraryAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Department</span>}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
            )}
            {/* Dropdown Menu for User Management */}
            <li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setAgentOpen(!AgentOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: AgentOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}}/>
                        {open && <span>Users Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {AgentOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/users"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <FaUserGroup  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Users</span>}
                                </NavLink>
                            </li>
                            {/* {userRoles.includes("SuperAdmin") &&<li>
                                <NavLink
                                    to="/add-admin"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Admin</span>}
                                </NavLink>
                            </li>}
                            {userRoles.includes("OrgAdmin") &&<li>
                                <NavLink
                                    to="/add-head"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Head</span>}
                                </NavLink>
                            </li>}
                            {(userRoles.includes("SuperAdmin")||userRoles.includes("OrgAdmin") || userRoles.includes("HeadManager"))&&<li>
                                <NavLink
                                    to="/add-manager"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Manager</span>}
                                </NavLink>
                            </li>}
                            {(userRoles.includes("Manager")||userRoles.includes("OrgAdmin") || userRoles.includes("HeadManager"))&&<li>
                                <NavLink
                                    to="/add-agent"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Agent</span>}
                                </NavLink>
                            </li>} */}
                            {(userRoles.includes("Manager")||userRoles.includes("OrgAdmin") || userRoles.includes("HeadManager") || userRoles.includes("SuperAdmin"))&&<li>
                                <NavLink
                                    to="/add-user"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add User</span>}
                                </NavLink>
                            </li>}
                        </ul>
                    )}
                </li>
                {/* Dropdown Menu for Task Management */}
                {(userRoles.includes("OrgAdmin") || userRoles.includes("Manager") || userRoles.includes("HeadManager") ||userRoles.includes("SuperAdmin")) &&<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setTaskOpen(!TaskOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: TaskOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}} />
                        {open && <span className='cursor-pointer'>Task Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {TaskOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/tasks"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <FaTasks  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Tasks</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-task"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Task</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/assign-agent"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Assigen Agent</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/assign-parent"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Assign Parent</span>}
                                </NavLink>
                            </li>
                            
                        </ul>
                    )}
                </li>
                }
                {/* Dropdown Menu for Cases Management */}
                {(userRoles.includes("OrgAdmin") || userRoles.includes("Manager") || userRoles.includes("HeadManager") ||userRoles.includes("SuperAdmin"))&&<li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setCaseOpen(!CaseOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown size={15} style={{ transform: CaseOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}} />
                        {open && <span className='cursor-pointer'>Case Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {CaseOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/cases"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <FaTasks  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Cases</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-case"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Case</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/assign-parent"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Assign Revelant</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/attach-document"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >
                                    <BiAddToQueue  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Attach Document</span>}
                                </NavLink>
                            </li>
                            
                        </ul>
                    )}
                </li>}
                
                {/* Dropdown Menu for Client Management */}
                <li className="mb-3">
                    <div
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded cursor-pointer hover-bg-light"
                        onClick={() => setClientOpen(!ClientOpen)} 
                        style={{ fontSize: "0.75rem" }}
                    >
                        <FaChevronDown style={{ transform: ClientOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" ,marginRight:"10px"}} />
                        {open && <span>Client Management</span>}
                    </div>

                    {/* Dropdown items */}
                    {ClientOpen && (
                        <ul className="list-unstyled ms-3 mt-2">
                            <li>
                                <NavLink
                                    to="/clients"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                >   <FaPeopleRoof size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Clients</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/add-client"
                                    className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                                > 
                                    <IoMdPersonAdd  size={15} className="me-2" />
                                    {open && <span style={{ fontSize: "0.75rem" }}>Add Client</span>}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="mb-3 fs-6">
                    <NavLink
                        className="d-flex align-items-center text-decoration-none text-white p-2 rounded hover-bg-light"
                        style={{ fontSize: "0.75rem" }}
                        onClick={handlelogout}
                    >
                        <FiLogOut  size={15} className="me-2" />
                        {open && <span>Logout</span>}
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SidebarMenu;
