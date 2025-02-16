

const initialState = {
    loading: false,
    Services: [],
    FilterServices: [], 
    filteredServices:[],
    error: null,
  };
  
  const ServicesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_SERVICES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "FETCH_SERVICES_SUCCESS":
        return { ...state, loading: false, Services: action.payload,FilterServices:action.payload};
  
      case "FETCH_SERVICES_FAILURE":
        return { ...state, loading: false, error: action.payload };
      case "FETCH_FILTER_SERVICES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "FETCH_FILTER_SERVICES_SUCCESS":
        return { ...state, loading: false, filteredServices: action.payload};
  
      case "FETCH_FILTER_SERVICES_FAILURE":
        return { ...state, loading: false, error: action.payload };

      case "ADD_SERVICES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "ADD_SERVICES_SUCCESS":
        return {
          ...state,
          loading: false,
          Services: [...state.Services, action.payload]
        };
  
      case "ADD_SERVICES_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      case "EDIT_SERVICES_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "EDIT_SERVICES_SUCCESS":
        return {
          ...state,
          loading: false,
          Services: state.Services.map((Service) =>
            Service.id === action.payload.id ? action.payload : Service
          ),
          FilterServices: state.FilterServices.map((Service) =>
            Service.id === action.payload.id ? action.payload : Service
          ),
        };
  
      case "EDIT_SERVICES_FAILURE":
        return { ...state, loading: false, error: action.payload };
  
      case "DELETE_SERVICES_REQUEST":
        return { ...state, loading: true };
  
      case "DELETE_SERVICES_SUCCESS":
        return {
          ...state,
          Services: state.Services.filter(
            (Service) => Service.id !== action.payload
          ),
          FilterServices: state.FilterServices.filter(
            (Service) => Service.id !== action.payload
          ),
        };
  
      case "DELETE_SERVICES_FAIL":
        return { ...state, error: action.payload, loading: false };
        case "FILTER_SERVICES":
            return {
                ...state,
                FilterServices: action.payload,
            };
      default:
        return state;
    }
  };
export default ServicesReducer;