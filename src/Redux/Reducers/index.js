import { combineReducers } from 'redux';
import OrgReducer from './OrgReducer';
import DepartmentReducer from './DepartmentReducer';
import ClientReducer from './ClientReducer';
import CategoryReducer from './CategoryReducer';
import TaskReducer from './TaskReducer';
import ServicesReducer from './serviceReducer';
import UsersReducer from './UserReducer';
import CaseReducer from './CaseReducer';
import CourtReducer from './CourtReducer';
import DocumentReducer from './DocumentReducer';


const rootReducer = combineReducers({
    Orgs: OrgReducer, 
    Departments: DepartmentReducer,
    Clients: ClientReducer,
    Categories: CategoryReducer,
    Tasks: TaskReducer,
    Services: ServicesReducer,
    Users: UsersReducer,
    Cases: CaseReducer,
    Courts: CourtReducer,
    Documents: DocumentReducer,
});

export default rootReducer;
