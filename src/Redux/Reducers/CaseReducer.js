const initialState = {
    loading: false,
    Cases: [],
    FilteredCases:[],
    error: null,
  };
  const CaseReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_CASES_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_CASES_SUCCESS':
            return{...state, loading:false, Cases:action.payload, FilteredCases:action.payload};
        case 'FETCH_CASES_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_CASES_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_CASES_SUCCESS':
            return { ...state, loading: false, Cases: [...state.Cases, action.payload] };
        case 'ADD_CASES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_CASES_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_CASES_SUCCESS':
            return {
                ...state,
                loading: false,
                Cases: state.Cases.map((Case) =>
                    Case.id === action.payload.id ? action.payload : Case
                ),
                FilteredCases: state.FilteredCases.map((Case) =>
                    Case.id === action.payload.id ? action.payload : Case
                ),
            };
        case 'EDIT_CASES_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_CASES_SUCCESS":
            return {
                ...state,
                Cases: state.Cases.filter(Case => Case.id !== action.payload),
                FilteredCases: state.FilteredCases.filter(Case => Case.id !== action.payload),
            };
        case "DELETE_CASES_REQUEST":
            return { ...state, loading: true };
        case "DELETE_CASES_FAIL":
            return { ...state, error: action.payload, loading: false };
        case "ASSIGN_CASES_SUCCESS":
            return {
                ...state,loading: false};
        case "ASSIGN_CASES_REQUEST":
                return { ...state, loading: true };
        case "ASSIGN_CASES_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "ATTACH_CASES_SUCCESS":
            return {
                ...state,loading: false};
        case "ATTACH_CASES_REQUEST":
                return { ...state, loading: true };
        case "ATTACH_CASES_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_CASES":
            return {
                ...state,
                FilteredCases: action.payload,
            };
        default:
            return state;

    }

};
export default CaseReducer;