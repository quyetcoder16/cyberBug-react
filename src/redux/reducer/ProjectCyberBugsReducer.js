import { GET_LIST_PROJECT } from "../types/cyberBugConstant/CyberBugConstants";

const stateDefault = {
    projectList: [
    ]
}

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_LIST_PROJECT: {
            state.projectList = action.projectList
            return { ...state };
        }

        default: {
            return { ...state };
        }
    }
}