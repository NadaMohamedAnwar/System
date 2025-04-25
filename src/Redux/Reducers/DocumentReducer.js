import Documents from "../../Pages/documents";

const initialState = {
    loading: false,
    Documents: [],
    DocumentLog:[],
    FilterDocument:[],
    error: null,
  };
  const DocumentReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_DOCUMENT_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_DOCUMENT_SUCCESS':
            return{...state, loading:false, Documents:action.payload,FilterDocument:action.payload};
        case 'FETCH_DOCUMENT_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'FETCH_DOCUMENT_LOG_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_DOCUMENT_LOG_SUCCESS':
            return{...state, loading:false, DocumentLog:action.payload};
        case 'FETCH_DOCUMENT_LOG_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_DOCUMENT_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_DOCUMENT_SUCCESS':
            return { ...state, loading: false, Documents: [...state.Documents, action.payload] };
        case 'ADD_DOCUMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_DOCUMENT_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_DOCUMENT_SUCCESS':
            return {
                ...state,
                loading: false,
                Documents: state.Documents.map((doc) =>
                    doc.id === action.payload.id ? action.payload : doc
                ),
                FilterDocument: state.FilterDocument.map((doc) =>
                    doc.id === action.payload.id ? action.payload : doc
                ),
            };
        case 'EDIT_DOCUMENT_FAILURE':
            return { ...state, loading: false, error: action.payload };
        
        case "FILTER_DOCUMENT":
            return {
                ...state,
                FilterDocument: action.payload,
            };
        default:
            return state;

    }

};
export default DocumentReducer;