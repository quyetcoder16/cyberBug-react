import { GET_TASK_API } from "../types/ToDoListType";
import Axios from "axios";


export const getTaskListAPIAction = () => {
    // return dispatch => {
    //     let promise = Axios({
    //         url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: 'GET'
    //     });

    //     promise.then((result) => {
    //         dispatch({
    //             type: GET_TASK_API,
    //             taskList: result.data
    //         });
    //     });

    //     promise.catch((err) => {
    //         console.log(err.response.data);
    //     })
    // }

    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }
        } catch (err) {
            console.log(err);
        }

    }
}

export const deleteTaskAction = (taskName) => {
    // return dispatch => {
    //     let promise = Axios({
    //         url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
    //         method: 'DELETE'
    //     });

    //     promise.then(res => {
    //         // alert(res.data);
    //         dispatch(getTaskListAPIAction());
    //     })

    //     promise.catch(err => {
    //         alert(err.response.data);
    //     });
    // }

    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            });
            if (status === 200) {
                dispatch(getTaskListAPIAction());
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const doneTaskAction = (taskName) => {
    // return dispatch => {
    //     let promise = Axios({
    //         url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
    //         method: 'PUT'
    //     });

    //     promise.then(res => {
    //         // alert(res.data);
    //         dispatch(getTaskListAPIAction());
    //     });

    //     promise.catch(err => {
    //         alert(err.response.data);
    //     });
    // }

    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            });
            if (status === 200) {
                dispatch(getTaskListAPIAction());
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const rejectTaskAction = (taskName) => {
    // return dispatch => {
    //     let promise = Axios({
    //         url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
    //         method: 'PUT'
    //     });

    //     promise.then(res => {
    //         // alert(res.data);
    //         dispatch(getTaskListAPIAction());
    //     });

    //     promise.catch(err => {
    //         alert(err.response.data);
    //     });
    // }
    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            });
            if (status === 200) {
                dispatch(getTaskListAPIAction());
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const addTaskAction = (taskName) => {
    // return dispatch => {
    //     let promise = Axios({
    //         url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
    //         method: 'POST',
    //         data: {
    //             taskName: taskName
    //         }
    //     });

    //     promise.then(res => {
    //         // getTaskList();
    //         dispatch(getTaskListAPIAction());
    //         // console.log(res);
    //     });

    //     promise.catch(err => {
    //         alert(err.response.data);
    //     });
    // }
    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: {
                    taskName: taskName
                }
            });
            console.log(status);
            if (status === 200) {
                dispatch(getTaskListAPIAction());
            }
        } catch (err) {
            console.log(err);
        }
    }
}