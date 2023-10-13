import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from "../../types/cyberBugConstant/CyberBugConstants";
import { CyberBugServices } from "../../../services/CyberBugServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { STATUS_CODE } from "../../../util/constants/settingSytem";

function* createProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    try {
        const { data, status } = yield call(() => {
            return CyberBugServices.createProjectAuthorization(action.newProject);
        });
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
        }
    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

function* getListProject(action) {
    yield put({
        type: DISPLAY_LOADING
    });
    try {
        const { data, status } = yield call(() => {
            return CyberBugServices.getAllListProject();
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetListProject() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProject)
}