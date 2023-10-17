import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { GET_LIST_PROJECT_SAGA, USER_SIGNIN_API, USLOGIN } from '../../types/cyberBugConstant/CyberBugConstants';
import { CyberBugServices } from '../../../services/CyberBugServices';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSytem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/ToDoListType';
import { history } from '../../../util/constants/History';
import { userService } from '../../../services/UserService';

function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    try {
        const { data, status } = yield call(() => {
            return CyberBugServices.signinCyberBug(action.userLogin);
        });
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // const history = yield select(state => state.HistoryReducer.history);
        // console.log(history);
        history.push('/home');
        // console.log(data);
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiSigninSaga() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* getUserSaga(action) {
    try {
        // console.log(action);
        const { data, status } = yield call(() => {
            return userService.getUser(action.keyWord)
        });
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_USER_SEARCH',
                lstUserSearch: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data);
    }
}

export function* theoDoiGetUserSaga() {
    yield takeLatest('GET_USER_API', getUserSaga);
}

function* addUserProjectSaga(action) {
    // console.log(action);
    try {
        const { data, status } = yield call(() => {
            return userService.assignUserProject(action.userProject);
        });
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })
    } catch (err) {
        console.log(err.response.data);
    }
}

export function* theoDoiAddUserProject() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

function* removeUserFromProjectSaga(action) {
    console.log(action);
    try {
        const { data, status } = yield call(() => {
            return userService.deleteUSerFromProject(action.userProject);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_SAGA
            })
        }
    } catch (err) {
        console.log(err.response.data);
    }
}

export function* theoDoiRemoveUserFromProject() {
    yield takeLatest("REMOVE_USER_PROJECT_API", removeUserFromProjectSaga)
}