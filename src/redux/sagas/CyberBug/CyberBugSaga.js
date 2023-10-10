import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { USER_SIGNIN_API, USLOGIN } from '../../types/cyberBugConstant/CyberBugConstants';
import { CyberBugServices } from '../../../services/CyberBugServices';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSytem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../types/ToDoListType';

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

        const history = yield select(state => state.HistoryReducer.history);
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