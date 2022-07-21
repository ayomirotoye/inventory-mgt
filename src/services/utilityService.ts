import { listOfValuesEndpoint } from "../networks/endpoints";
import httpService from "../networks/httpService";

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