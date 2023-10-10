import { GET_TASK_API } from "../types/ToDoListType";

const initialState = {
    taskList: []
}
const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_API: {
            // console.log(action);
            state.taskList = [...action.taskList];
            return { ...state };
        }

        default:
            return { ...state };
    }
}

export default ToDoListReducer;
