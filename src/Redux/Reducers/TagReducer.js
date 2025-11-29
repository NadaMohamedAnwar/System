const initialState = {
    loading: false,
    Tags: [],
    FilterTags:[],
    error: null,
  };
  const TagReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_TAGS_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_TAGS_SUCCESS':
            return{...state, loading:false, Tags:action.payload,FilterTags:action.payload};
        case 'FETCH_TAGS_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_TAGS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_TAGS_SUCCESS':
            return { ...state, loading: false, Tags: [...state.Tags, action.payload] };
        case 'ADD_TAGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_TAGS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_TAGS_SUCCESS':
            return {
                ...state,
                loading: false,
                Tags: state.Tags.map((Tag) =>
                    Tag.id === action.payload.id ? action.payload : Tag
                ),
                FilterTags: state.FilterTags.map((Tag) =>
                    Tag.id === action.payload.id ? action.payload : Tag
                )
            };
        case 'EDIT_TAGS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_TAGS_SUCCESS":
            return {
                ...state,
                Tags: state.Tags.filter(Tag => Tag.id !== action.payload),
                FilterTags: state.FilterTags.filter(Tag => Tag.id !== action.payload)
            };
        case "DELETE_TAGS_REQUEST":
                return { ...state, loading: true };
        case "DELETE_TAGS_FAILURE":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_TAGS":
            return {
                ...state,
                FilterTags: action.payload,
            };
        default:
            return state;

    }

};
export default TagReducer;