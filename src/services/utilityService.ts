import { listOfValuesEndpoint } from "../networks/endpoints";
import { httpServiceInterface } from "../networks/httpClientWrapper";

export const getCallCategoriesUrl = async () => {
    try {
        const { data } = await httpServiceInterface.get(listOfValuesEndpoint.concat("/country"))
            .catch(() => {
                return { data: [] };
            });
        return data?.data ?? [];
    } catch (err: any) {
        return { data: [] };
    }
}