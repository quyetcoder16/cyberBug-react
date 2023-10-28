import { call, put, takeLatest, delay } from "redux-saga/effects";
import { GET_ALL_USER, GET_ALL_USER_SAGA, USER_SIGN_UP_SAGA } from "../../types/cyberBugConstant/UserConstant";
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

function* getAllUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return userService.getUser('');
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER,
                arrUser: data.content,
            })
        }
    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiGetAllUserSaga() {
    yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}