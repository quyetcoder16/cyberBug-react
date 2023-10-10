import Axios from "axios";
import { DOMAIN } from "../util/constants/settingSytem";


export class ToDoListService {
    constructor() {

    }

    getTaskApi = () => {
        return Axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
    }

    deleteTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }

    doneTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
    }

    rejectTask = (taskName) => {
        return Axios({
            url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
    }

}

export const toDoListService = new ToDoListService();
