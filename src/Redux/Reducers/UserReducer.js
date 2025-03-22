import Profile from "../../Pages/profile";
import { filterUsers } from "../Actions/Action";

const initialState = {
    loading: false,
    Users: [],
    FilterUsers:[],
    Profile:{},
    error: null,
  };
  const UsersReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'FETCH_USERS_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_USERS_SUCCESS':
            return{...state, loading:false, Users:action.payload, FilterUsers:action.payload};
        case 'FETCH_USERS_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'FETCH_PROFILE_REQUEST':
            return{...state, loading:true, error:null};
        case 'FETCH_PROFILE_SUCCESS':
            return{...state, loading:false, Profile:action.payload};
        case 'FETCH_PROFILE_FAILURE':
            return{...state, loading:false, error:action.payload};
        case 'ADD_USERS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_USERS_SUCCESS':
            return { ...state, loading: false, Users: [...state.Users, action.payload] };
        case 'ADD_USERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'EDIT_USERS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'EDIT_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                Users: state.Users.map((User) =>
                    User.id === action.payload.id ? action.payload : User
                ),
                FilterUsers: state.FilterUsers.map((User) =>
                    User.id === action.payload.id ? action.payload : User
                ),
            };
        case 'EDIT_USERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ACT_USERS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'ACT_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                Users: state.Users.map((User) =>
                    User.id === action.payload?.id ? { ...User, ...action.payload } : User
                ),
                FilterUsers: state.FilterUsers.map((User) =>
                    User.id === action.payload?.id ? { ...User, ...action.payload } : User
                ),
            };
        case 'ACT_USERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'DEACT_USERS_REQUEST':
                return { ...state, loading: true, error: null };
        case 'DEACT_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                Users: state.Users.map((User) =>
                    User.id === action.payload?.id ? { ...User, ...action.payload } : User
                ),
                FilterUsers: state.FilterUsers.map((User) =>
                    User.id === action.payload?.id ? { ...User, ...action.payload } : User
                ),
            };
        case 'DEACT_USERS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case "DELETE_USERS_SUCCESS":
            return {
                ...state,
                Users: state.Users.filter(User => User.id !== action.payload),
                FilterUsers: state.FilterUsers.filter(User => User.id !== action.payload),
            };
        case "DELETE_USERS_REQUEST":
                return { ...state, loading: true };
        case "DELETE_USERS_FAIL":
                return { ...state, error: action.payload, loading: false };
        case "FILTER_USERS":
            return {
                ...state,
                FilterUsers: action.payload,
            };
        default:
            return state;

    }

};
export default UsersReducer;