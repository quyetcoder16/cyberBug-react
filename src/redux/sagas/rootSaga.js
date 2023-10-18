import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga';
import * as CyberBug from './CyberBug/CyberBugSaga'
import * as ProjectCategorySaga from './CyberBug/ProjectCategorySaga';
import * as ProjectCyberBugSaga from './CyberBug/ProjectCyberBugSaga';

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

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),

        // project cyber bug

        ProjectCyberBugSaga.theoDoiCreateProjectSaga(),
        ProjectCyberBugSaga.theoDoiGetListProject(),
        ProjectCyberBugSaga.theoDoiUppdateProject(),
        ProjectCyberBugSaga.theoDoiDeleteProject(),
        ProjectCyberBugSaga.theoDoiGetProjectDetail(),
    ])
}