import { call, put, takeLatest, delay } from "redux-saga/effects";
import { USER_SIGN_UP_SAGA } from "../../types/cyberBugConstant/UserConstant";
import { userService } from "../../../services/UserService";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import { history } from "../../../util/constants/History";


function* userSignUpSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return userService.UserSignUp(action.newUser);
        });
        console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield delay(500);
            yield put({
                type: HIDE_LOADING,
            })
            history.push('/login')
        }
    } catch (err) {
        console.log(err);
        console.log(err.response.data);
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiUserSignUpSaga() {
    yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}