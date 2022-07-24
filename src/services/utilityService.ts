import { listOfValuesEndpoint } from "../networks/endpoints";
import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";

export const getCallCategoriesUrl = async () => {
    try {
        const { data } = await httpService.get(listOfValuesEndpoint.concat("/country"))
            .catch(() => {
                return { data: [] };
            });
        return data?.data ?? [];
    } catch (err: any) {
        return { data: [] };
    }
}

export const getCallUserRolesUrl = async () => {
    try {
        const { data } = await httpService.get(endpoints.fetchRolesEndpoint)
            .catch(() => {
                return { data: [] };
            });
        return data?.data ?? [];
    } catch (err: any) {
        return { data: [] };
    }
}