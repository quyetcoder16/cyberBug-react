import { BaseService } from "./BaseServices";

export class StatusServices extends BaseService {
    constructor() {
        super();
    }

    getAllStatus = () => {
        return this.get('Status/getAll');
    }
}

export const statusServices = new StatusServices();