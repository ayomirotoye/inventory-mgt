import { isNullOrUndefined } from "../libs/helper";
import httpService from "../networks/httpService";
import { parseJwt } from "./tokenUtils";

export const getValueFromUserDetail = (valueToGet: any) => {
    let valueToReturn;
    let tokenVal = getTokenVal();
    let userDetails = parseJwt(tokenVal);
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
        case "tokenEnabled":
            let tokenEnabled = !isNullOrUndefined(userDetails)
                ? userDetails?.user_token_enabled
                : "";
            valueToReturn = tokenEnabled;
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
        case "corporateId":
            let corporateId = !isNullOrUndefined(userDetails)
                ? userDetails?.corporate_id
                : "";
            valueToReturn = corporateId;
            break;
        case "corporateCode":
            let corporateCode = !isNullOrUndefined(userDetails)
                ? userDetails?.corporate_code
                : "";
            valueToReturn = corporateCode;
            break;
        case "companyName":
            let encComName = sessionStorage.getItem("companyName");
            let companyName = !isNullOrUndefined(encComName) ? encComName : "";
            valueToReturn = companyName;
            break;

        default:
            valueToReturn = "";
            break;
    }
    return valueToReturn;
};

export const getTokenVal = () => {
    return httpService.getJwt();
};
