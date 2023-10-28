import { BaseService } from "./BaseServices";


export class CommentServices extends BaseService {
    constructor() {
        super();
    }

    getAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`);
    }

    deleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`);
    }

    addComment = (newComment) => {
        return this.post("Comment/insertComment", newComment);
    }

}

export const commentServices = new CommentServices();