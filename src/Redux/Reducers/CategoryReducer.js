const initialState = {
    loading: false,
    Categories: [],
    FilterCategories: [],
    error: null,
  };
  const CategoryReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_CATEGORY_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_CATEGORY_SUCCESS':
            return{...state, loading:false, Categories:action.payload,FilterCategories:action.payload};
        case 'FETCH_CATEGORY_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_CATEGORY_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_CATEGORY_SUCCESS':
            return { ...state, loading: false, Categories: [...state.Categories, action.payload] };
        case 'ADD_CATEGORY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_CATEGORY_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                Categories: state.Categories.map((Category) =>
                    Category.id === action.payload.id ? action.payload : Category
                ),
                FilterCategories: state.FilterCategories.map((Category) =>
                    Category.id === action.payload.id ? action.payload : Category
                ),
            };
        case 'EDIT_CATEGORY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_CATEGORY_REQUEST":
            return { ...state, loading: true };
        case "DELETE_CATEGORY_SUCCESS":
            return {
                ...state,
                Categories: state.Categories.filter(Category => Category.id !== action.payload),
                FilterCategories: state.FilterCategories.filter(Category => Category.id !== action.payload),
            };
        case "DELETE_CATEGORY_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_CATEGORY":
            return {
                ...state,
                FilterCategories: action.payload,
            };
        default:
            return state;

    }

};
export default CategoryReducer;