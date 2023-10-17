import { BaseService } from "./BaseServices";


export class UserService extends BaseService {
    constructor() {
        super();
    }

    getUser = (keyword) => {
        // console.log(keyword);
        return this.get(`Users/getUser?keyword=${keyword}`);
    }

    assignUserProject = (userProject) => {
        // console.log(userProject);
        return this.post("Project/assignUserProject", userProject)
    }

    deleteUSerFromProject = (userProject) => {
        return this.post("Project/removeUserFromProject", userProject);
    }
}

export const userService = new UserService();