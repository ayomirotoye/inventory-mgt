import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";
import { handleMyErrors } from "./errorHandlingService";

export const callGetUserByUsernameApi = async (username: string) => {
    try {
        const { data } = await httpService.get(endpoints.fetchUserByUsernameEndpoint.concat("?username=", username))
            .catch(() => {
                return { data: {} };
            });
        return data?.data ?? {};
    } catch (err: any) {
        return { data: {} };
    }
}
export const callDeleteUsersApi = async (userId: string) => {
    try {
        const { data } = await httpService.delete(endpoints.deleteUserEndpoint.concat("/", userId))
            .catch(() => {
                return { data: {} };
            });
        return data?.data ?? {};
    } catch (err: any) {
        return { data: {} };
    }
}
export const callGetUsersApi = async () => {
    try {
        const { data } = await httpService.get(endpoints.fetchUsersEndpoint)
            .catch(() => {
                return { data: {} };
            });
        return data.data ?? {};
    } catch (err: any) {
        return { data: {} };
    }
}

export const callPostAddUserApi = async (request: any) => {
    try {
        const { data } = await httpService.post(endpoints.addUserEndpoint, request)
            .catch((err: any) => {
                console.log("eee::", err)
                return handleMyErrors(err);
            });
        return data;
    } catch (err: any) {
        return handleMyErrors(err);
    }
}