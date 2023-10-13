import { GET_ALL_PROJECT_CATEGORY } from "../types/cyberBugConstant/CyberBugConstants";

const stateDefault = {
    arrProjectCategory: []
}

const ProjectCartegoryReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_ALL_PROJECT_CATEGORY: {
            state.arrProjectCategory = action.data;
            // console.log(state);
            return { ...state };
        }

        default: {
            return { ...state };
        }
    }
}

export default ProjectCartegoryReducer;