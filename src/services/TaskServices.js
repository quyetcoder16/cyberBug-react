import { BaseService } from "./BaseServices";


export class TaskServices extends BaseService {
    constructor() {
        super();
    }

    createTask = (taskObject) => {
        return this.post("Project/createTask", taskObject);
    }
}


export const taskServices = new TaskServices();