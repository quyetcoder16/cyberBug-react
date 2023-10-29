import { call, put, takeLatest, delay } from "redux-saga/effects";
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_ALL_USER, GET_ALL_USER_SAGA, GET_USER_BY_KEYWORD, GET_USER_BY_KEYWORD_SAGA, USER_SIGN_UP_SAGA } from "../../types/cyberBugConstant/UserConstant";
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
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            switch (action.typeAction) {
                case 'USER_SIGN_UP': {
                    yield delay(500);
                    yield put({
                        type: HIDE_LOADING,
                    })
                    history.push('/login');
                    break;
                }
                case 'CREATE_USER': {
                    yield put({
                        type: GET_ALL_USER_SAGA,
                    })
                    yield put({
                        type: 'CLOSE_DRAWER',
                    })
                    break;
                }
                default: {
                    yield delay(500);
                    yield put({
                        type: HIDE_LOADING,
                    })
                    history.push('/login');
                }
            }
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
            });
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

function* deleteUserSaga(action) {
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return userService.deleteUser(action.userId);
        });
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_KEYWORD_SAGA,
                keyWord: action.keyWord,
            });
        }
    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

function* getUserByKeyWordSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return userService.getUser(action.keyWord);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_KEYWORD,
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

export function* theoDoiGetUserByKeyWordSaga() {
    yield takeLatest(GET_USER_BY_KEYWORD_SAGA, getUserByKeyWordSaga);
}

function* editUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return userService.editUser(action.userUpdate);
        });
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'CLOSE_DRAWER',
            });
            yield put({
                type: GET_ALL_USER_SAGA,
            });
        }
    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}