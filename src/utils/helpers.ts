import { isNullOrUndefined } from "../libs/helper";
import httpService from "../networks/httpService";

export const getValueFromUserDetail = (valueToGet?: any) => {
    let valueToReturn;
    // let tokenVal = getTokenVal();
    let userDetails = JSON.parse(sessionStorage.getItem("userDetails") ?? "{}");
    switch (valueToGet) {
        case "username":
            let username = !isNullOrUndefined(userDetails)
                ? userDetails?.user_name
                : "";
            valueToReturn = username;
            break;
        case "firstName":
            let encFName = sessionStorage.getItem("firstName");
            let firstName = !isNullOrUndefined(encFName) ? encFName : "";
            valueToReturn = firstName;
            break;
        case "isLoggedIn":
            valueToReturn = !isNullOrUndefined(sessionStorage.getItem("isLoggedIn"))
                ? sessionStorage.getItem("isLoggedIn")
                : "false";
            break;
        case "userRole":
            let userRole = !isNullOrUndefined(userDetails)
                ? userDetails?.roleIds
                : "";
            valueToReturn = userRole;
            break;
        case "userId":
            let userId = !isNullOrUndefined(userDetails)
                ? userDetails?.user_id
                : "";
            valueToReturn = userId;
            break;
        default:
            valueToReturn = userDetails;
            break;
    }
    return valueToReturn;
};

export const getTokenVal = () => {
    return httpService.getJwt();
};
