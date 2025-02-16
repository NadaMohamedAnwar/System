const initialState = {
    loading: false,
    Departments: [],
    FilterDepartments: [],
    error: null,
  };
  const DepartmentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_DEPARTMENT_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_DEPARTMENT_SUCCESS':
            return{...state, loading:false, Departments:action.payload,FilterDepartments:action.payload};
        case 'FETCH_DEPARTMENT_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'FETCH_INACTIVE_DEPARTMENT_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_INACTIVE_DEPARTMENT_SUCCESS':
            return{...state, loading:false, Departments:action.payload};
        case 'FETCH_INACTIVE_DEPARTMENT_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_DEPARTMENT_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_DEPARTMENT_SUCCESS':
            return { ...state, loading: false, Departments: [...state.Departments, action.payload] };
        case 'ADD_DEPARTMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_DEPARTMENT_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_DEPARTMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                Departments: state.Departments.map((Department) =>
                    Department.id === action.payload.id ? action.payload : Department
                ),
                FilterDepartments: state.FilterDepartments.map((Department) =>
                    Department.id === action.payload.id ? action.payload : Department
                ),
            };
        case 'EDIT_DEPARTMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ASSIGN_DEPARTMENT_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ASSIGN_DEPARTMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                Departments: state.Departments.map((Department) =>
                    Department.id === action.payload.id ? action.payload : Department
                ),
                FilterDepartments: state.FilterDepartments.map((Department) =>
                    Department.id === action.payload.id ? action.payload : Department
                ),
            };
        case 'ASSIGN_DEPARTMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_DEPARTMENT_SUCCESS":
            return {
                ...state,
                Departments: state.Departments.filter(Department => Department.id !== action.payload),
                FilterDepartments: state.FilterDepartments.filter(Department => Department.id !== action.payload),
            };
        case "DELETE_DEPARTMENT_REQUEST":
                return { ...state, loading: true };
        case "DELETE_DEPARTMENT_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_DEPARTMENT":
            return {
                ...state,
                FilterDepartments: action.payload,
            };
        default:
            return state;

    }

};
export default DepartmentReducer;