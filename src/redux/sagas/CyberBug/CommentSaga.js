import { put, takeLatest } from "redux-saga/effects"
import { GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA } from "../../types/cyberBugConstant/CommentConstants"
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