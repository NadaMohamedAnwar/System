import React ,{ useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardAgent from './Pages/DashboardAgent';
import Login from './Pages/login';
import Header from './Layouts/header';
import PrivateRoute from './Components/PrivateRoute'
import SidebarMenue from './Layouts/sidemenue';
import Home from './Pages/home';
import AddOrg from './Pages/AddOrg';
import OrgManagement from './Pages/AllOrganizations';
import AddDep from './Pages/AddDep';
import EditOrg from './Pages/EditOrg';
import ActiveDep from './Pages/ActiveDep';
import InActiveDep from './Pages/InActiveDep';
import EditDep from './Pages/editDep';
import AssignDep from './Pages/assignDep';
import ClientsManagement from './Pages/clientsManagement';
import AddClient from './Pages/addClient';
import AddCategory from './Pages/addCategory';
import CategoryManagement from './Pages/categoryManagement';
import EditCategory from './Pages/editCategory';
import EditClient from './Pages/editClient';
import AddTask from './Pages/addTask';
import TaskManagement from './Pages/tasksManagement';
import ServicesManagement from './Pages/servicesManagement';
import AddService from './Pages/addService';
import AgentManagement from './Pages/userManagment';
import AddAgent from './Pages/addAgent';
import UserManagement from './Pages/userManagment';
import AddOrgAdmin from './Pages/addOrgAdmin';
import AddManager from './Pages/addManager';
import EditUser from './Pages/editUser';
import CaseManagement from './Pages/caseManagement';
import AddCase from './Pages/addCase';
import EditCase from './Pages/editCase';
import AddHead from './Pages/addHead';
import CalendarComponent from './Pages/calendar';
import AssignAgent from './Pages/assignAgent';
import AssignParent from './Pages/assignParent';
import AddUser from './Pages/addUser';
import ViewCase from './Pages/viewCase';
import ViewTask from './Pages/viewTask';
import AttachCaseFile from './Pages/attachCaseFile';
import ViewClient from './Pages/viewClient';
import ViewUser from './Pages/viewUser';
import ViewOrg from './Pages/viewOrg';
import ViewDep from './Pages/viewDep';
import EditAgent from './Pages/editAgent';
// import './App.css'; 

function App() {
  const token = sessionStorage.getItem('token');
  return (
    <div>
      <HashRouter>
       {token && <Header/>}
        
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='*' element={<h2>Page Not Found</h2>} />
          {/* <Route path='/home' element={<PrivateRoute component={Home} roles={['SuperAdmin','OrgAdmin','Manager','HeadManager']}  />} /> */}
          <Route path='/dashboard-agent' element={<PrivateRoute component={DashboardAgent} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']} />} />
          <Route path='/schduel' element={<PrivateRoute component={CalendarComponent} roles={['OrgAdmin','Manager','HeadManager']}  />} />

          <Route path='/add-category' element={<PrivateRoute component={AddCategory} roles={['SuperAdmin']} />} />
          <Route path='/categories' element={<PrivateRoute component={CategoryManagement} roles={['SuperAdmin']} />} />
          <Route path='/edit-category/:id' element={<PrivateRoute component={EditCategory} roles={['SuperAdmin']}  />} />

          <Route path='/add-org' element={<PrivateRoute component={AddOrg} roles={['SuperAdmin']}  />} />
          <Route path='/edit-org/:id' element={<PrivateRoute component={EditOrg} roles={['SuperAdmin']}  />} />
          <Route path='/view-org' element={<PrivateRoute component={ViewOrg} roles={['SuperAdmin']}  />} />
          <Route path='/organizations' element={<PrivateRoute component={OrgManagement} roles={['SuperAdmin']}  />} />
          
          <Route path='/add-service' element={<PrivateRoute component={AddService} roles={['SuperAdmin']}  />} />
          {/* <Route path='/edit-service/:id' element={<PrivateRoute component={} roles={['SuperAdmin']}  />} /> */}
          <Route path='/services' element={<PrivateRoute component={ServicesManagement} roles={['SuperAdmin']}  />} />

          <Route path='/clients' element={<PrivateRoute component={ClientsManagement} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']}  />} />
          <Route path='/add-client' element={<PrivateRoute component={AddClient} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']} />} />
          <Route path='/edit-client/:id' element={<PrivateRoute component={EditClient} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']}  />} />
          <Route path='/view-client/:id' element={<PrivateRoute component={ViewClient} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']} />} />
          
          <Route path='/users' element={<PrivateRoute component={UserManagement} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']}  />} />
          {/* <Route path='/add-agent' element={<PrivateRoute component={AddAgent} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']} />} /> */}
          <Route path='/add-user' element={<PrivateRoute component={AddUser} roles={['OrgAdmin','SuperAdmin']} />} />
          {/* <Route path='/add-admin' element={<PrivateRoute component={AddOrgAdmin} roles={['SuperAdmin']} />} />
          <Route path='/add-head' element={<PrivateRoute component={AddHead} roles={['OrgAdmin','SuperAdmin']} />} />
          <Route path='/add-manager' element={<PrivateRoute component={AddManager} roles={['OrgAdmin','SuperAdmin','HeadManager']} />} /> */}
          <Route path='/edit-user/:id' element={<PrivateRoute component={EditUser} roles={['OrgAdmin','SuperAdmin']}  />} />
          <Route path='/edit-agent' element={<PrivateRoute component={EditAgent} roles={['OrgAdmin','SuperAdmin']}  />} />
          <Route path='/view-user/:id' element={<PrivateRoute component={ViewUser} roles={['OrgAdmin','Manager','SuperAdmin','HeadManager']} />} />
          

          <Route path='/add-department' element={<PrivateRoute component={AddDep} roles={['OrgAdmin']} />} />
          <Route path='/active-departments' element={<PrivateRoute component={ActiveDep} roles={['OrgAdmin']} />} />
          <Route path='/inactive-departments' element={<PrivateRoute component={InActiveDep} roles={['OrgAdmin']} />} />
          <Route path='/assign-department' element={<PrivateRoute component={AssignDep} roles={['OrgAdmin']} />} />
          <Route path='/edit-dep/:id' element={<PrivateRoute component={EditDep} roles={['OrgAdmin']}  />} />
          <Route path='/view-department/:id' element={<PrivateRoute component={ViewDep} roles={['OrgAdmin']}  />} />

          <Route path='/add-task' element={<PrivateRoute component={AddTask} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/assign-agent' element={<PrivateRoute component={AssignAgent} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/assign-parent' element={<PrivateRoute component={AssignParent} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/tasks' element={<PrivateRoute component={TaskManagement} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/view-task/:id' element={<PrivateRoute component={ViewTask} roles={['OrgAdmin','Manager','HeadManager']} />} />

          
          <Route path='/cases' element={<PrivateRoute component={CaseManagement} roles={['OrgAdmin','Manager','HeadManager']}  />} />
          <Route path='/add-case' element={<PrivateRoute component={AddCase} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/edit-case/:id' element={<PrivateRoute component={EditCase} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/view-case/:id' element={<PrivateRoute component={ViewCase} roles={['OrgAdmin','Manager','HeadManager']} />} />
          <Route path='/attach-document' element={<PrivateRoute component={AttachCaseFile} roles={['OrgAdmin','Manager','HeadManager']} />} />


          
          <Route path='/logout' element={<Login />} /> 
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;



