import { BaseService } from "./BaseServices";


export class TaskServices extends BaseService {
    constructor() {
        super();
    }

    createTask = (taskObject) => {
        return this.post("Project/createTask", taskObject);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`);
    }
}


export const taskServices = new TaskServices();