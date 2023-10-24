import { call, put, takeLatest } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { taskServices } from "../../../services/TaskServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import { NotificationCyberBug } from "../../../util/Notiifications/NotificationCyberBug";

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