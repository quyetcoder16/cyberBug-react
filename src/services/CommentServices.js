import { BaseService } from "./BaseServices";


export class CommentServices extends BaseService {
    constructor() {
        super();
    }

    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }

}

export const commentServices = new CommentServices();