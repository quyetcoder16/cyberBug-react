import { BaseService } from "./BaseServices";

export class ProjectService extends BaseService {
    constructor() {
        super();
    }
    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`);
    }

    getAllProject = () => {
        return this.get("Project/getAllProject");
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
}

export const projectService = new ProjectService();