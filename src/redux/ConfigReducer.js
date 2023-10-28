import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducer/ToDoListReducer";
import LoadingReducer from "./reducer/LoadingReducer";
import ModalReducer from "./reducer/ModalReducer";
import reduxThunk from 'redux-thunk'

// setup saga 
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from "./sagas/rootSaga";
import { HistoryReducer } from "./reducer/HistoryReducer";
import { UserLoginCyberBugReducer } from "./reducer/UserLoginCyberBugReducer";
import ProjectCartegoryReducer from "./reducer/ProjectCategoryReducer";
import { ProjectCyberBugsReducer } from "./reducer/ProjectCyberBugsReducer";
import { DrawerProjectReducer } from "./reducer/DrawerProjectReducer";
import { ProjectReducer } from "./reducer/ProjectReducer";
import { TaskTypeReducer } from "./reducer/TaskTypeReducer";
import { PriorityReducer } from "./reducer/PriorityReducer";
import { StatusReducer } from "./reducer/StatusReducer";
import { TaskReducer } from "./reducer/TaskReducer";
import { CommentReducer } from "./reducer/CommentReducer";
import { UserReducer } from "./reducer/UserReducer";

const middleWareSaga = createMiddleWareSaga();

const ConfigReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserLoginCyberBugReducer,
    ProjectCartegoryReducer,
    ProjectCyberBugsReducer,
    DrawerProjectReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer,
    UserReducer,
});

const store = createStore(ConfigReducer, applyMiddleware(reduxThunk, middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;