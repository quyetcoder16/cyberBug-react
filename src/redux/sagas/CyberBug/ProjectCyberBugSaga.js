import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from "../../types/cyberBugConstant/CyberBugConstants";
import { CyberBugServices } from "../../../services/CyberBugServices";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/ToDoListType";
import { STATUS_CODE } from "../../../util/constants/settingSytem";
import { projectService } from "../../../services/ProjectService";
import { NotificationCyberBug } from "../../../util/Notiifications/NotificationCyberBug";
import { GET_ALL_PROJECT } from "../../types/cyberBugConstant/ProjectCyberConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../types/cyberBugConstant/UserConstant";

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

function* updateProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })

    try {
        const { data, status } = yield call(() => {
            return CyberBugServices.updateProject(action.projectUpdate);
        })
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data);
            yield put({
                type: 'CLOSE_DRAWER'
            })
        }
    } catch (err) {
        console.log(err);
    }


    yield put({
        type: GET_LIST_PROJECT_SAGA,
    })
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiUppdateProject() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}

function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING,
    })

    try {
        // console.log(action);
        const { data, status } = yield call(() => {
            return projectService.deleteProject(action.idProject);
        });
        if (status === STATUS_CODE.SUCCESS) {
            NotificationCyberBug('success', 'DELETE project Done!');
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            })
        } else {
            NotificationCyberBug('error', 'DELETE project fail!');
        }
        // console.log(data);
    } catch (err) {
        NotificationCyberBug('error', 'DELETE project fail!');

        console.log(err);
    }

    yield put({
        type: HIDE_LOADING,
    })
}


export function* theoDoiDeleteProject() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
    // console.log(action);
    yield put({
        type: DISPLAY_LOADING,
    })
    try {
        const { data, status } = yield call(() => {
            return projectService.getProjectDetail(action.projectId);
        });
        if (status === STATUS_CODE.SUCCESS) {
            // console.log(data);
            yield put({
                type: "PUT_PROJECT_DETAIL",
                projectDetail: data.content
            })
        }
    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING,
    })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}

function* getAllProject(action) {
    // console.log(action);
    try {
        const { data, status } = yield call(() => {
            return projectService.getAllProject();
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT,
                arrProject: data.content
            });
            yield put({
                type: GET_USER_BY_PROJECT_ID_SAGA,
                projectId: data.content[0].id,
            })
        }

    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getAllProject);
}