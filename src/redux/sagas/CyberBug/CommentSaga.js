import { call, put, takeLatest } from "redux-saga/effects"
import { ADD_COMMENT_SAGA, DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA } from "../../types/cyberBugConstant/CommentConstants"
import { commentServices } from "../../../services/CommentServices";
import { STATUS_CODE } from "../../../util/constants/settingSytem";

function* getAllCommentSaga(action) {
    // console.log(action);
    try {
        const { data, status } = yield commentServices.getAllComment(action.taskId);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT,
                arrComment: data.content,
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetAllCommentSaga() {
    yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

function* deleteCommentSaga(action) {
    try {
        const { data, status } = yield call(() => {
            return commentServices.deleteComment(action.idComment);
        })
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId: action.taskId,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

function* addCommentSaga(action) {
    try {
        const newComment = {
            taskId: action.taskId,
            contentComment: action.contentComment,
        }
        const { data, status } = yield call(() => {
            return commentServices.addComment(newComment);
        });
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_COMMENT_SAGA,
                taskId: action.taskId,
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiAddCommentSaga() {
    yield takeLatest(ADD_COMMENT_SAGA, addCommentSaga);
}

