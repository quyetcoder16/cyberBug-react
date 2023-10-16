import Axios from "axios"
import { DOMAIN_CYBER_BUG, TOKEN } from "../util/constants/settingSytem"


export class BaseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/${url}`,
            data: model,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    }
    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/${url}`,
            method: 'POST',
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    get = (url) => {
        // console.log('Bearer ' + localStorage.getItem(TOKEN));
        console.log(`${DOMAIN_CYBER_BUG}/${url}`);
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/${url}`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/${url}`,
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    }

}