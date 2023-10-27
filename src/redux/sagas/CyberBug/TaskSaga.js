import { call, put, select, takeLatest } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { taskServices } from "../../../services/TaskServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import { NotificationCyberBug } from "../../../util/Notiifications/NotificationCyberBug";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../../types/cyberBugConstant/TaskConstants";

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

function* updateTaskSaga(action) {



}


export function* theoDoiUdpateTask() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}


function* handelChangePostApi(action) {
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;

            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
        } break;
        case CHANGE_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })

        }; break;
        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        } break;
        default: break;
    }
    let { taskDetailModal } = yield select(state => state.TaskReducer);
    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });

    const taskUpdateApi = { ...taskDetailModal, listUserAsign };

    try {
        const { data, status } = yield call(() => taskServices.updateTask(taskUpdateApi));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateApi.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }

    } catch (err) {
        console.log(err.response?.data);
        console.log(err);
    }

}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}