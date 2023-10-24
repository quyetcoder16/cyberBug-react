import { GET_TASK_TYPE } from "../types/cyberBugConstant/TaskTypeConstants"

const initialState = {
    arrTaskType: []
}

export const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_TYPE: {
            return { ...state, arrTaskType: action.arrTaskType }
        }

        default:
            return { ...state }
    }
}
