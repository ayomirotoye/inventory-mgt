import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";

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