const initialState = {
    loading: false,
   Folders: [],
   subfolders: [], 
   folder: null, 
   files: [], 
    FilterFolders:[],
    error: null,
  };
  const FolderReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_FOLDER_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_FOLDER_SUCCESS':
            return{...state, loading:false, Folders:action.payload,FilterFolders:action.payload};
        case 'FETCH_FOLDER_FAILURE':
            return{...state, loading:false, error:action.payload};
            case "FETCH_SUB_FOLDER_REQUEST":
                return {
                  ...state,
                  loading: true,
                };
              case "FETCH_SUB_FOLDER_SUCCESS":
                return {
                  ...state,
                  loading: false,
                  folder: action.payload.folder, 
                  subfolders: action.payload.subfolders, 
                  files: action.payload.files, 
                  error: '',
                };
              case "FETCH_FOLDER_SUB_FAILURE":
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
        case 'ADD_FOLDER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_FOLDER_SUCCESS':
            return { ...state, loading: false, Folders: [...state.Folders, action.payload] };
        case 'ADD_FOLDER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;

    }

};
export default FolderReducer;