import { call, put, takeLatest } from "redux-saga/effects";
import { GET_TASK_TYPE, GET_TASK_TYPE_SAGA } from "../../types/cyberBugConstant/TaskTypeConstants";
import { taskTypeService } from "../../../services/TaskTypeService";
import { STATUS_CODE } from "../../../util/constants/settingSytem";

function* getTaskType(action) {
    try {
        const { data, status } = yield call(() => {
            return taskTypeService.getAllTaskType();
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_TYPE,
                arrTaskType: data.content
            });
        }

    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetTaskTypeSaga() {
    yield takeLatest(GET_TASK_TYPE_SAGA, getTaskType);
}