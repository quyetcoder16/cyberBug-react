import { call, put, takeLatest } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { taskServices } from "../../../services/TaskServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import { NotificationCyberBug } from "../../../util/Notiifications/NotificationCyberBug";
import { GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from "../../types/cyberBugConstant/TaskConstants";

function* createTaskSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    });

    try {
        const { data, status } = yield call(() => {
            return taskServices.createTask(action.taskObject);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'CLOSE_DRAWER'
            });
            NotificationCyberBug('success', 'Create task successfully !');
            console.log(data);
        }
    } catch (err) {
        console.log(err.response.data);
    };

    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}

function* getTaskDetail(action) {
    try {
        const { data, status } = yield call(() => {
            return taskServices.getTaskDetail(action.taskId);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content,
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
    }
}

export function* theoDoiGetTaskDetail() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

function* updateTaskStatusSaga(action) {
    try {
        const { taskUpdateStatus } = action;
        const { data, status } = yield call(() => {
            return taskServices.updateStatusTask(taskUpdateStatus);
        });
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateStatus.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            });
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}