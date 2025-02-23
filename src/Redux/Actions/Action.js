import axios from "axios";


// ===============================Departments========================================================================================

export const fetchActiveDepartments = (orgId) => async (dispatch) => {
  dispatch({ type: 'FETCH_DEPARTMENT_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    // const orgId = sessionStorage.getItem('orgId')
    const response = await axios.get('http://agentsys.runasp.net/api/Departments',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
          IsActive: true,  
          OrgId: orgId     
        }
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_DEPARTMENT_SUCCESS', payload: response.data });
    
  } catch (error) {
    dispatch({
      type: 'FETCH_DEPARTMENT_FAILURE',
      payload: error.message,
    });
  }
};


export const fetchInActiveDepartments = () => async (dispatch) => {
  dispatch({ type: 'FETCH_INACTIVE_DEPARTMENT_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const orgId = sessionStorage.getItem('orgId')
    const response = await axios.get('http://agentsys.runasp.net/api/Departments',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
          IsActive: false,  
          OrgId: orgId     
        }
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_INACTIVE_DEPARTMENT_SUCCESS', payload: response.data });
    
  } catch (error) {
    dispatch({
      type: 'FETCH_INACTIVE_DEPARTMENT_FAILURE',
      payload: error.message,
    });
  }
};


export const addDepartment = (DepData) => async (dispatch) => {
  dispatch({ type: 'ADD_DEPARTMENT_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
    const response = await axios.post('http://agentsys.runasp.net/api/Departments', DepData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_DEPARTMENT_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_DEPARTMENT_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editDepartment = (id, DepData) => async (dispatch) => {
  dispatch({ type: 'EDIT_DEPARTMENT_REQUEST' });
  try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
          `http://agentsys.runasp.net/api/Departments/${id}`,
          DepData,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      
      dispatch({ type: 'EDIT_DEPARTMENT_SUCCESS', payload: response.data });
  } catch (error) {
      dispatch({ type: 'EDIT_DEPARTMENT_FAILURE', payload: error.message });
      throw error;
  }
};
export const assignDepartment = (id, ManagerId) => async (dispatch) => {
  dispatch({ type: 'ASSIGN_DEPARTMENT_REQUEST' });
  try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post(
          `http://agentsys.runasp.net/api/Departments/${id}/AssignManager/${ManagerId}`, {},
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          }
      );
      
      dispatch({ type: 'ASSIGN_DEPARTMENT_SUCCESS', payload: response.data });
  } catch (error) {
      dispatch({ type: 'ASSIGN_DEPARTMENT_FAILURE', payload: error.message });
      throw error;
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_DEPARTMENT_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Departments/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_DEPARTMENT_SUCCESS", payload: id });
  } catch (error) {
      dispatch({
          type: "DELETE_DEPARTMENT_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const filterDeps = (name,profile) => (dispatch, getState) => {
  const { Departments } = getState().Departments

  const filteredDepartments = Departments.filter((c) => {
    
    return (
      (name && c.name.toLowerCase().includes(name.toLowerCase())) &&
      (profile && c.profileType === profile)
    );
  });

  dispatch({ type: "FILTER_DEPARTMENT", payload: filteredDepartments }); 
};
// =============================Organizations====================
export const fetchOrgs = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ORGS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Organizations',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_ORGS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_ORGS_FAILURE',
      payload: error.message,
    });
  }
};


export const addAOrg = (OrgData) => async (dispatch) => {
  dispatch({ type: 'ADD_ORGS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post('http://agentsys.runasp.net/api/Organizations', OrgData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_ORGS_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_ORGS_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editOrg = (id, OrgData) => async (dispatch) => {
  dispatch({ type: 'EDIT_ORGS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Organizations/${id}`,
      OrgData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_ORGS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); // This will give you more insight into why it failed
    dispatch({ type: 'EDIT_ORGS_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const deleteOrg = (Id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_ORGS_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Organizations/${Id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_ORGS_SUCCESS", payload: Id });
  } catch (error) {
      dispatch({
          type: "DELETE_ORGS_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const activateOrgs = (id) => async (dispatch) => {
  dispatch({ type: 'EDIT_ORGS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.patch(
      `http://agentsys.runasp.net/api/Organizations/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_ORGS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'EDIT_ORGS_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const DeactivateOrgs = (id) => async (dispatch) => {
  dispatch({ type: 'EDIT_ORGS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Organizations/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_ORGS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'EDIT_ORGS_FAILURE', payload: error.message });
    throw error;
  }
  
};
export const filterOrgs = (name, type, status) => (dispatch, getState) => {
  const { Orgs } = getState().Orgs

  const filteredOrgs = Orgs.filter((c) => {
    console.log(name, type, status);
    
    return (
      (!name || c.organizationName.toLowerCase().includes(name.toLowerCase())) &&
      (!type || c.organizationType === type) &&
      (!status || c.organizationStatus === status)
    );
  });

  dispatch({ type: "FILTER_ORGS", payload: filteredOrgs }); // Dispatch the filtered results
};


// =================================Clients=======================
export const fetchClients = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CLIENTS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Clients',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_CLIENTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_CLIENTS_FAILURE',
      payload: error.message,
    });
  }
};


export const addClient = (clientData) => async (dispatch) => {
  dispatch({ type: 'ADD_CLIENTS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post('http://agentsys.runasp.net/api/Clients', clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_CLIENTS_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_CLIENTS_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editClient = (id, clientData) => async (dispatch) => {
  dispatch({ type: 'EDIT_CLIENTS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Clients/${id}`,
      clientData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_CLIENTS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); // This will give you more insight into why it failed
    dispatch({ type: 'EDIT_CLIENTS_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_CLIENTS_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Clients/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_CLIENTS_SUCCESS", payload: id });
  } catch (error) {
      dispatch({
          type: "DELETE_CLIENTS_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const filterClients = (departmentId) => (dispatch) => {
  dispatch({ type: "FILTER_CLIENTS", payload: departmentId });
};

// ==========================category=======================
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CATEGORY_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Category',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload: response.data.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_CATEGORY_FAILURE',
      payload: error.message,
    });
  }
};


export const addCategory = (name) => async (dispatch) => {
  dispatch({ type: 'ADD_CATEGORY_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    console.log("name",name)
    const response = await axios.post('http://agentsys.runasp.net/api/Category',{name}, 
     {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
    dispatch({ type: 'ADD_CATEGORY_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_CATEGORY_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editCategory = (id, name) => async (dispatch) => {
  dispatch({ type: 'EDIT_CATEGORY_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Category/${id}`,
      { Name: name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: 'EDIT_CATEGORY_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); // This will give you more insight into why it failed
    dispatch({ type: 'EDIT_CATEGORY_FAILURE', payload: error.message });
    throw error;
  }
  
};
export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_CATEGORY_REQUEST" });

  try {
    const token = sessionStorage.getItem("token");
    await axios.delete(`http://agentsys.runasp.net/api/Category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: id });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to delete category";
    dispatch({ type: "DELETE_CATEGORY_FAIL", payload: errorMessage });
    throw new Error(errorMessage); // Ensure the error is thrown for proper handling
  }
};
export const filterCategory = (name) => (dispatch, getState) => {
  const { Categories } = getState().Categories;

  const filteredCategories = Categories.filter((c) => {
    
    return (
      (name && c.name.toLowerCase().includes(name.toLowerCase()))
    );
  });
   console.log(filteredCategories)

  dispatch({ type: "FILTER_CATEGORY", payload: filteredCategories });
};

// =============================Tasks====================
export const fetchTasks = (depid) => async (dispatch) => {
  dispatch({ type: 'FETCH_TASKS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const OrgId = sessionStorage.getItem('orgId');
    
    const response = await axios.get(`http://agentsys.runasp.net/api/Departments/${depid}/Tasks`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        
        params: { OrgId},
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_TASKS_FAILURE',
      payload: error.message,
    });
  }
};
export const fetchAllTasks = (ClientId,ServiceId,TaskTypeId,Status,CaseId,ParentTaskId,AssignedTo,CreatedBy,DepartmentIds) => async (dispatch) => {
  dispatch({ type: 'FETCH_TASKS_REQUEST' });
  console.log("Final departmentId before fetching tasks:", DepartmentIds);
  try {
    const token = sessionStorage.getItem('token');
    const OrgId = sessionStorage.getItem('orgId');
    const params = { OrgId };
    if (ClientId) params.ClientId = ClientId;
    if (ServiceId) params.ServiceId = ServiceId;
    if (TaskTypeId) params.TaskTypeId = TaskTypeId;
    if (Status) params.Status = Status;
    if (CaseId) params.CaseId = CaseId;
    if (ParentTaskId) params.ParentTaskId = ParentTaskId;
    if (AssignedTo) params.AssignedTo = AssignedTo;
    if (CreatedBy) params.CreatedBy = CreatedBy;
    if (DepartmentIds && DepartmentIds.length > 0) {
      params.DepartmentIds = DepartmentIds;
  }
    const response = await axios.get('http://agentsys.runasp.net/api/Task',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        
        params,
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_TASKS_FAILURE',
      payload: error.message,
    });
  }
};


export const addATask = (taskData) => async (dispatch) => {
  dispatch({ type: 'ADD_TASKS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post('http://agentsys.runasp.net/api/Task', taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_TASKS_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_TASKS_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const assignTaskToAgent = (taskId,AgentId) => async (dispatch) => {
  dispatch({ type: 'ASSIGN_TASKS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post(`http://agentsys.runasp.net/api/Task/${taskId}/assign/${AgentId}`,{}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: 'ASSIGN_TASKS_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ASSIGN_TASKS_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};

export const filterTasks = (name, sDate, priority) => (dispatch, getState) => {
  const { Tasks } = getState().Tasks;

  const filteredCases = Tasks.filter((c) => {
    const caseDate = c.dueDate ? c.dueDate.split("T")[0] : ""; // Extract "YYYY-MM-DD" format

    return (
      (name && c.title.toLowerCase().includes(name.toLowerCase())) &&
      (sDate && caseDate === sDate) &&
      (priority && c.priority === priority)
    );
  });


  dispatch({ type: "FILTER_TASKS", payload: filteredCases });
};
// =============================Services====================
export const fetchServices = () => async (dispatch) => {
  dispatch({ type: 'FETCH_SERVICES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Service',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_SERVICES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_SERVICES_FAILURE',
      payload: error.message,
    });
  }
};


export const addServices = (ServicesData) => async (dispatch) => {
  dispatch({ type: 'ADD_SERVICES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post('http://agentsys.runasp.net/api/Service', ServicesData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_SERVICES_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_SERVICES_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editServices = (id, ServicesData) => async (dispatch) => {
  dispatch({ type: 'EDIT_SERVICES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Service/${id}`,
      ServicesData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_SERVICES_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); // This will give you more insight into why it failed
    dispatch({ type: 'EDIT_SERVICES_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const deleteServices = (id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_SERVICES_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Service/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_SERVICES_SUCCESS", payload: id });
  } catch (error) {
      dispatch({
          type: "DELETE_SERVICES_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const filterServices = (departmentid) => async(dispatch) => {
  dispatch({ type: 'FETCH_FILTER_SERVICES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const OrgId = sessionStorage.getItem('orgId');
    const response = await axios.get(`http://agentsys.runasp.net/api/Departments/${departmentid}/Services`,
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: { OrgId},
      }
    );
    console.log(response.data[0])
    dispatch({ type: 'FETCH_FILTER_SERVICES_SUCCESS', payload: response.data[0] });
  } catch (error) {
    console.log(error.response)
    dispatch({
      type: 'FETCH_FILTER_SERVICES_FAILURE',
      payload: error.message,
    });
  }
};
export const filterService = (name,profile) => (dispatch, getState) => {
  const { Services } = getState().Services;

  const filteredServices = Services.filter((c) => {
    
    return (
      (name && c.name.toLowerCase().includes(name.toLowerCase())) &&
      (profile && c.profileName === profile)
    );
  });


  dispatch({ type: "FILTER_SERVICES", payload: filteredServices });
};
// =============================USERS====================
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response:", response.data); // Debugging log

    if (response.data.isSuccessful) {
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data.data }); // Fix: Use response.data.data
    } else {
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: "API call failed" });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_USERS_FAILURE',
      payload: error.message,
    });
  }
};



export const addUsers = (userData,type) => async (dispatch) => {
  dispatch({ type: 'ADD_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    console.log(`http://agentsys.runasp.net/api/Users/${type}`, userData)
    const response = await axios.post(`http://agentsys.runasp.net/api/Users/${type}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    dispatch({ type: 'ADD_USERS_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_USERS_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editUsers = (userData,type) => async (dispatch) => {
  dispatch({ type: 'EDIT_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Users/${type}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'EDIT_USERS_FAILURE', payload: error.message });
    throw error;
  }
  
};
export const activateUsers = (id,type) => async (dispatch) => {
  dispatch({ type: 'ACT_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Users/${type}/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data)
    dispatch({ type: 'ACT_USERS_SUCCESS', payload: response.data});
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'ACT_USERS_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const DeactivateUsers = (id,type) => async (dispatch) => {
  dispatch({ type: 'DEACT_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Users/${type}/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data)
    dispatch({ type: 'DEACT_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'DEACT_USERS_FAILURE', payload: error.message });
    throw error;
  }
  
};
export const activateAdmin = (id,type) => async (dispatch) => {
  dispatch({ type: 'ACT_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Admin/${id}/active`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data)
    dispatch({ type: 'ACT_USERS_SUCCESS', payload: response.data});
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'ACT_USERS_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const DeactivateAdmin = (id,type) => async (dispatch) => {
  dispatch({ type: 'DEACT_USERS_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Admin/${id}/deactive`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data)
    dispatch({ type: 'DEACT_USERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); 
    dispatch({ type: 'DEACT_USERS_FAILURE', payload: error.message });
    throw error;
  }
  
};
export const deleteUsers= (Id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_USERS_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Organizations/${Id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_USERS_SUCCESS", payload: Id });
  } catch (error) {
      dispatch({
          type: "DELETE_USERS_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const filterUsers = (orgName, Phone,NationalId) => (dispatch, getState) => {
  const { Users } = getState().Users;
  const filteredCases = Users.filter((c) => {

    return (
      (orgName && c.organization.toLowerCase().includes(orgName.toLowerCase())) &&
      (NationalId && c.nationalId === NationalId) &&
      (Phone && c.phone === Phone)
    );
  });


  dispatch({ type: "FILTER_USERS", payload: filteredCases });
};
// =============================Cases=============================
export const fetchCases = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CASES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://agentsys.runasp.net/api/Cases',
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    dispatch({ type: 'FETCH_CASES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'FETCH_CASES_FAILURE',
      payload: error.message,
    });
  }
};


export const addCases  = (CaseData) => async (dispatch) => {
  dispatch({ type: 'ADD_CASES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post('http://agentsys.runasp.net/api/Cases', CaseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: 'ADD_CASES_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ADD_CASES_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const editCases  = (id, CaseData) => async (dispatch) => {
  dispatch({ type: 'EDIT_CASES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.put(
      `http://agentsys.runasp.net/api/Cases/${id}`,
      CaseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'EDIT_CASES_SUCCESS', payload: response.data });
  } catch (error) {
    console.log('Error Response:', error.response); // This will give you more insight into why it failed
    dispatch({ type: 'EDIT_CASES_FAILURE', payload: error.message });
    throw error;
  }
  
};

export const deleteCases  = (id) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
      dispatch({ type: "DELETE_CASES_REQUEST" });
      await axios.delete(`http://agentsys.runasp.net/api/Cases/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      dispatch({ type: "DELETE_CASES_SUCCESS", payload: id });
  } catch (error) {
      dispatch({
          type: "DELETE_CASES_FAIL",
          payload: error.response?.data?.message || error.message,
      });
  }
};
export const assignCaseToParent = (CaseId,linkedCaseId) => async (dispatch) => {
  dispatch({ type: 'ASSIGN_CASES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post(`http://agentsys.runasp.net/api/Cases/${CaseId}/link/${linkedCaseId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: 'ASSIGN_CASES_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ASSIGN_CASES_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const attachCaseFile = (CaseId,formData) => async (dispatch) => {
  dispatch({ type: 'ATTACH_CASES_REQUEST' });
  try {
    const token = sessionStorage.getItem('token'); 
    const response = await axios.post(`http://agentsys.runasp.net/api/Cases/${CaseId}/Documents`,formData , {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });
    dispatch({ type: 'ATTACH_CASES_SUCCESS', payload: response.data });
    return Promise.resolve(response.data); 
  } catch (error) {
    dispatch({
      type: 'ATTACH_CASES_FAILURE',
      payload: error.message,
    });
    return Promise.reject(error); 
  }
};
export const filterCases = (name, sDate, clientId) => (dispatch, getState) => {
  const { Cases } = getState().Cases;

  const filteredCases = Cases.filter((c) => {
    const caseDate = c.startDate ? c.startDate.split("T")[0] : ""; // Extract "YYYY-MM-DD" format

    return (
      (name && c.title.toLowerCase().includes(name.toLowerCase())) &&
      (sDate && caseDate === sDate) &&
      (clientId && c.clientId === parseInt(clientId, 10))
    );
  });


  dispatch({ type: "FILTER_CASES", payload: filteredCases });
};
