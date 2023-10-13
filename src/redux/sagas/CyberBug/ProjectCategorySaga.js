import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../types/cyberBugConstant/CyberBugConstants";
import { CyberBugServices } from "../../../services/CyberBugServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";


function* getAllProjectCategory(action) {
    // console.log(action);
    try {
        const { data, status } = yield call(() => {
            return CyberBugServices.getAllCategory();
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }

    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}