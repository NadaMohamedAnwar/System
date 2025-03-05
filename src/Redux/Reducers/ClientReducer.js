const initialState = {
    loading: false,
    Clients: [],
    filteredClients: [],  
    error: null,
};

const ClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CLIENTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_CLIENTS_SUCCESS':
            return { ...state, loading: false, Clients: action.payload, filteredClients: action.payload };
        case 'FETCH_CLIENTS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'ADD_CLIENTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'ADD_CLIENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                Clients: [...state.Clients, action.payload],
                filteredClients: [...state.Clients, action.payload], 
            };
        case 'ADD_CLIENTS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'EDIT_CLIENTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'EDIT_CLIENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                Clients: state.Clients.map((Client) =>
                    Client.id === action.payload.id ? action.payload : Client
                ),
                filteredClients: state.filteredClients.map((Client) =>
                    Client.id === action.payload.id ? action.payload : Client
                ),
            };
        case 'EDIT_CLIENTS_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case "DELETE_CLIENTS_REQUEST":
            return { ...state, loading: true };
        case "DELETE_CLIENTS_SUCCESS":
            return {
                ...state,
                Clients: state.Clients.filter(Client => Client.id !== action.payload),
                filteredClients: state.filteredClients.filter(Client => Client.id !== action.payload),
            };
        case "DELETE_CLIENTS_FAIL":
            return { ...state, error: action.payload, loading: false };

        case "FILTER_CLIENTS":
            return {
                ...state,
                filteredClients: state.Clients.filter(Client =>
                    Client.name.toLowerCase().includes(action.payload) 
                ),
            };
        case "FILTER_CLIENTDATA":
            return {
                ...state,
                filteredClients: action.payload,
            };

        default:
            return state;
    }
};

export default ClientReducer;
