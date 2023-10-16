import { BaseService } from "./BaseServices";

export class ProjectService extends BaseService {
    constructor() {
        super();
    }
    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    }
}

export const projectService = new ProjectService();