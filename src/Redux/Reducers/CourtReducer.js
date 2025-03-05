const initialState = {
    loading: false,
    Courts: [],
    FilterCourts:[],
    error: null,
  };
  const CourtReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_COURT_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_COURT_SUCCESS':
            return{...state, loading:false, Courts:action.payload,FilterCourts:action.payload};
        case 'FETCH_COURT_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_COURT_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_COURT_SUCCESS':
            return { ...state, loading: false, Courts: [...state.Courts, action.payload] };
        case 'ADD_COURT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_COURT_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_COURT_SUCCESS':
            return {
                ...state,
                loading: false,
                Courts: state.Courts.map((Court) =>
                    Court.id === action.payload.id ? action.payload : Court
                ),
                FilterCourts: state.FilterCourts.map((Court) =>
                    Court.id === action.payload.id ? action.payload : Court
                ),
            };
        case 'EDIT_COURT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_COURT_SUCCESS":
            return {
                ...state,
                Courts: state.Courts.filter(Court => Court.id !== action.payload),
                FilterCourts: state.FilterCourts.filter(Court => Court.id !== action.payload),
            };
        case "DELETE_COURT_REQUEST":
                return { ...state, loading: true };
        case "DELETE_COURT_FAILURE":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_COURT":
            return {
                ...state,
                FilterCourts: action.payload,
            };
        default:
            return state;

    }

};
export default CourtReducer;