import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../types/cyberBugConstant/StatusConstants";
import { statusServices } from "../../../services/StatusServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";

function* getAllStatusSaga(action) {
    // console.log(action);

    try {
        const { data, status } = yield call(() => {
            return statusServices.getAllStatus();
        });
        // console.log(status);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_STATUS,
                arrStatus: data.content,
            })
        }
    } catch (err) {
        console.log(err.response.data);
    }
}

export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}