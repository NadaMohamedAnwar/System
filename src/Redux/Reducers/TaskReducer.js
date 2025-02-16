const initialState = {
    loading: false,
    Tasks: [],
    FilterTasks:[],
    error: null,
  };
  const TaskReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_TASKS_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_TASKS_SUCCESS':
            return{...state, loading:false, Tasks:action.payload, FilterTasks:action.payload};
        case 'FETCH_TASKS_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_TASKS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_TASKS_SUCCESS':
            return { ...state, loading: false, Tasks: [...state.Tasks, action.payload] };
        case 'ADD_TASKS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_TASKS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_TASKS_SUCCESS':
            return {
                ...state,
                loading: false,
                Tasks: state.Tasks.map((Task) =>
                    Task.id === action.payload.id ? action.payload : Task
                ),
                FilterTasks: state.FilterTasks.map((Task) =>
                    Task.id === action.payload.id ? action.payload : Task
                ),
            };
        case 'EDIT_TASKS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_TASKS_SUCCESS":
            return {
                ...state,
                Tasks: state.Tasks.filter(Task => Task.id !== action.payload),
                FilterTasks: state.FilterTasks.filter(Task => Task.id !== action.payload),
            };
        case "DELETE_TASKS_REQUEST":
                return { ...state, loading: true };
        case "DELETE_TASKS_FAIL":
                return { ...state, error: action.payload, loading: false };
         case "ASSIGN_TASKS_SUCCESS":
            return {
                ...state,loading: false};
        case "ASSIGN_TASKS_REQUEST":
                return { ...state, loading: true };
        case "ASSIGN_TASKS_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_TASKS":
            return {
                ...state,
                FilterTasks: action.payload,
            };
        default:
            return state;

    }

};
export default TaskReducer;