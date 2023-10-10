import { USER_SIGNIN_API } from "../types/cyberBugConstant/CyberBugConstants"

export const signinCyberBugAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password
        }
    }
}