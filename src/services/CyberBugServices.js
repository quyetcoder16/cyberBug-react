import Axios from "axios"
import { DOMAIN_CYBER_BUG } from "../util/constants/settingSytem";

export const CyberBugServices = {
    signinCyberBug: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBER_BUG}/Users/signin`,
            method: 'POST',
            data: userLogin
        });
    }
}