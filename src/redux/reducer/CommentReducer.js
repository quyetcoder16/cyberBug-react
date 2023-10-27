import { GET_ALL_COMMENT } from "../types/cyberBugConstant/CommentConstants"

const initialState = {
    arrComment: [
        {
            "user": {
                "userId": 5791,
                "name": "dxquyet",
                "avatar": "https://ui-avatars.com/api/?name=dxquyet"
            },
            "id": 9584,
            "userId": 5791,
            "taskId": 10778,
            "contentComment": "<h1>oke la</h1>",
            "deleted": false,
            "alias": "oke-la"
        }
    ]
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {


        case GET_ALL_COMMENT: {
            state.arrComment = action.arrComment;
            // console.log(state);
            return { ...state };
        }

        default:
            return state
    }
}
