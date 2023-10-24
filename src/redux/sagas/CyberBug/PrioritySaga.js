import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../types/cyberBugConstant/PriorityConstants";
import { priorityServices } from "../../../services/PriorityServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";

function* getAllPriority(action) {
    try {
        const { status, data } = yield call(() => {
            return priorityServices.getAllPriority();
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetAllPriority() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}