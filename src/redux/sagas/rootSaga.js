import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga';
import * as CyberBug from './CyberBug/CyberBugSaga'

export function* rootSaga() {
    yield all([
        ToDoListSaga.theoDoiAction(),
        ToDoListSaga.theoDoiAddTaskApi(),
        ToDoListSaga.theoDoiDeleteTask(),
        ToDoListSaga.theoDoiDoneTask(),
        ToDoListSaga.theoDoiRejectTask(),
        // solve cyberBug

        CyberBug.theoDoiSigninSaga(),
    ])
}