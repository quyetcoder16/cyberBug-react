import { BaseService } from "./BaseServices";


export class UserService extends BaseService {
    constructor() {
        super();
    }

    getUser = (keyword) => {
        return this.get(`Users/getUser?keyword=${keyword}`);
    }
}

export const userService = new UserService();