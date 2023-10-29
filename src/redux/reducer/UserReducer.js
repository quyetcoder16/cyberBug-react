import { EDIT_USER, GET_ALL_USER, GET_USER_BY_KEYWORD } from "../types/cyberBugConstant/UserConstant"

const initialState = {
    arrUser: [
        {
            "userId": 2417,
            "name": "thinh2345",
            "avatar": "https://ui-avatars.com/api/?name=thinh2345",
            "email": "furkan1234@gmail.com",
            "phoneNumber": "0847999225"
        },
        {
            "userId": 2537,
            "name": "Mehmet129",
            "avatar": "https://ui-avatars.com/api/?name=Mehmet129",
            "email": "mehmet@gmail.com",
            "phoneNumber": "987654321"
        },
        {
            "userId": 2909,
            "name": "tên",
            "avatar": "https://ui-avatars.com/api/?name=tên",
            "email": "busra@gmail.com",
            "phoneNumber": "111111111"
        }
    ],
    userEdit: {
        "userId": 2537,
        "name": "Mehmet129",
        "avatar": "https://ui-avatars.com/api/?name=Mehmet129",
        "email": "mehmet@gmail.com",
        "phoneNumber": "987654321"
    }
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_USER: {
            state.arrUser = action.arrUser;
            return { ...state };
        }

        case GET_USER_BY_KEYWORD: {
            state.arrUser = action.arrUser;
            return { ...state };
        }

        case EDIT_USER: {
            state.userEdit = action.userEdit;
            return { ...state };
        }

        default:
            return state
    }
}
