import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";
import { handleMyErrors } from "./errorHandlingService";

export const callGetUserByUsernameApi = async (username: string) => {
    try {
        const { data } = await httpService.get(endpoints.fetchUserByUsername.concat("?userName=", username))
            .catch(() => {
                return { data: {} };
            });
        return data?.userData ?? {};
    } catch (err: any) {
        return { data: {} };
    }
}

export const callPostAddUserApi = async (request: any) => {
    try {
        const { data } = await httpService.post(endpoints.addUser, request)
            .catch((err: any) => {
                console.log("eee::", err)
                return handleMyErrors(err);
            });
        return data;
    } catch (err: any) {
        console.log("errr::", err)
        return handleMyErrors(err);
    }
}