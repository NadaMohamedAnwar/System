const initialState = {
    loading: false,
    Orgs: [],
    FilterOrgs:[],
    error: null,
  };
  const OrgReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_ORGS_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_ORGS_SUCCESS':
            // const filteredOrgs = action.payload.filter(org => org.organizationStatus === true);
            return{...state, loading:false, Orgs:action.payload,FilterOrgs:action.payload};
        case 'FETCH_ORGS_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_ORGS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_ORGS_SUCCESS':
            return { ...state, loading: false, Orgs: [...state.Orgs, action.payload] };
        case 'ADD_ORGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_ORGS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_ORGS_SUCCESS':
            return {
                ...state,
                loading: false,
                Orgs: state.Orgs.map((Org) =>
                    Org.id === action.payload.id ? action.payload : Org
                ),
                FilterOrgs: state.FilterOrgs.map((Org) =>
                    Org.id === action.payload.id ? action.payload : Org
                ),
            };
        case 'EDIT_ORGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_ORGS_SUCCESS":
            return {
                ...state,
                Orgs: state.Orgs.filter(Org => Org.id !== action.payload),
                FilterOrgs: state.FilterOrgs.filter(Org => Org.id !== action.payload),
            };
        case "DELETE_ORGS_REQUEST":
                return { ...state, loading: true };
        case "DELETE_ORGS_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_ORGS":
            return {
                ...state,
                FilterOrgs: action.payload,
            };
        default:
            return state;

    }

};
export default OrgReducer;