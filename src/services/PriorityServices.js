import { BaseService } from "./BaseServices";

export class PriorityServices extends BaseService {
    constructor() {
        super();
    }

    getAllPriority = () => {
        return this.get("Priority/getAll?id=0");
    }
}

export const priorityServices = new PriorityServices();