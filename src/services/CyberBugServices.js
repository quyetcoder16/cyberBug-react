import Axios from "axios"
import { DOMAIN_CYBER_BUG, TOKEN } from "../util/constants/settingSytem";

export const CyberBugServices = {
    signinCyberBug: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/Users/signin`,
            method: 'POST',
            data: userLogin
        });
    },
    getAllCategory: () => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/ProjectCategory`,
            method: 'GET'
        });
    },
    createProject: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorization: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getAllListProject: () => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/Project/getAllProject`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
    }
}