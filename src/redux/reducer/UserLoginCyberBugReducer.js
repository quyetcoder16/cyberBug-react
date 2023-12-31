import { USER_LOGIN } from "../../util/constants/settingSytem";
import { USLOGIN } from "../types/cyberBugConstant/CyberBugConstants";
import { GET_USER_BY_PROJECT_ID } from "../types/cyberBugConstant/UserConstant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin,
    userSearch: [],
    arrUser: [],
}

export const UserLoginCyberBugReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin
            // console.log(state);
            return { ...state };
        }

        case 'GET_USER_SEARCH': {
            // console.log(action);
            state.userSearch = action.lstUserSearch;
            // console.log('stateUser',state);
            return { ...state }
        }

        case GET_USER_BY_PROJECT_ID: {
            return { ...state, arrUser: action.arrUser };
        }

        default: {
            return { ...state }
        }
    }
}