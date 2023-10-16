import { BaseService } from "./BaseServices";


export class UserService extends BaseService {
    constructor() {
        super();
    }

    getUser = (keyword) => {
        // console.log(keyword);
        return this.get(`Users/getUser?keyword=${keyword}`);
    }
}

export const userService = new UserService();