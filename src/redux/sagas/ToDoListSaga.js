import { call, delay, put, takeLatest } from "redux-saga/effects"
import { ADD_TASK, DELETE_TASK, DISPLAY_LOADING, DONE_TASK, GET_TASK_API, GET_TASK_LIST, HIDE_LOADING, REJECT_TASK } from "../types/ToDoListType"
import { toDoListService } from "../../services/toDoListServices";
import { STATUS_CODE } from "../../util/constants/settingSytem";

function* getTaskApi() {
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        // console.log(123);
        yield delay(500);
        let { data, status } = yield call(toDoListService.getTaskApi);
        yield put({
            type: GET_TASK_API,
            taskList: data
        })
        yield put({
            type: HIDE_LOADING
        })
    } catch (err) {
        console.log(err);
    }

}

export function* theoDoiAction() {
    yield takeLatest(GET_TASK_LIST, getTaskApi)
}

function* addTaskSaga(action) {

    try {
        let { taskName } = action;
        let { status } = yield call(() => {
            return toDoListService.addTaskApi(taskName);
        })
        // console.log(status);
        if (status === STATUS_CODE.SUCCESS) {
            // console.log(123);
            yield put({
                type: GET_TASK_LIST
            });
        }
    } catch (err) {
        console.log(err);
    }

}

export function* theoDoiAddTaskApi() {
    yield takeLatest(ADD_TASK, addTaskSaga)
}

function* deleteTask(action) {

    try {
        let { taskName } = action;
        let { status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName);
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST
            })
        }
    } catch (err) {
        console.log(err);
    }

}

export function* theoDoiDeleteTask() {
    yield takeLatest(DELETE_TASK, deleteTask);
}

function* doneTask(action) {
    try {
        let { taskName } = action;
        let { status } = yield call(() => {
            return toDoListService.doneTaskApi(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST
            })
        }
    } catch (err) {
        console.log(err);
    }

}

export function* theoDoiDoneTask() {
    yield takeLatest(DONE_TASK, doneTask)
}

function* rejectTask(action) {
    try {
        let { taskName } = action;
        let { status } = yield call(() => {
            return toDoListService.rejectTask(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiRejectTask() {
    yield takeLatest(REJECT_TASK, rejectTask);
}