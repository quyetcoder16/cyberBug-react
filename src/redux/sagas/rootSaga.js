import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga';
import * as CyberBug from './CyberBug/CyberBugSaga'
import * as ProjectCategorySaga from './CyberBug/ProjectCategorySaga';
import * as ProjectCyberBugSaga from './CyberBug/ProjectCyberBugSaga';
import * as TaskTypeSaga from './CyberBug/TaskTypeSaga';
import * as PrioritySaga from './CyberBug/PrioritySaga';
import * as TaskSaga from './CyberBug/TaskSaga';
import * as StatusSaga from './CyberBug/StatusSaga';

export function* rootSaga() {
    yield all([
        ToDoListSaga.theoDoiAction(),
        ToDoListSaga.theoDoiAddTaskApi(),
        ToDoListSaga.theoDoiDeleteTask(),
        ToDoListSaga.theoDoiDoneTask(),
        ToDoListSaga.theoDoiRejectTask(),
        // solve cyberBug

        CyberBug.theoDoiSigninSaga(),
        CyberBug.theoDoiGetUserSaga(),
        CyberBug.theoDoiAddUserProject(),
        CyberBug.theoDoiRemoveUserFromProject(),
        CyberBug.theoDoiGetUserByProjectIdSaga(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),

        // project cyber bug

        ProjectCyberBugSaga.theoDoiCreateProjectSaga(),
        ProjectCyberBugSaga.theoDoiGetListProject(),
        ProjectCyberBugSaga.theoDoiUppdateProject(),
        ProjectCyberBugSaga.theoDoiDeleteProject(),
        ProjectCyberBugSaga.theoDoiGetProjectDetail(),
        ProjectCyberBugSaga.theoDoiGetAllProjectSaga(),

        // task type 
        TaskTypeSaga.theoDoiGetTaskTypeSaga(),

        // priority 

        PrioritySaga.theoDoiGetAllPriority(),

        // task saga

        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetail(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),

        // status saga 

        StatusSaga.theoDoiGetAllStatusSaga(),
    ])
}