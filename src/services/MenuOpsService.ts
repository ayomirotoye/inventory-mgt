import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";
import { handleMyErrors } from "./errorHandlingService";

export const callGetMenusApi = async () => {
  try {
    const { data } = await httpService
      .get(endpoints.fetchMenusEndpoint)
      .catch(() => {
        return { data: {} };
      });
    return data.data ?? {};
  } catch (err: any) {
    return { data: {} };
  }
};

export const callDeleteMenusApi = async (userId: string) => {
  try {
    const { data } = await httpService
      .delete(endpoints.deleteMenuEndpoint.concat("/", userId))
      .catch(() => {
        return { data: {} };
      });
    return data ?? {};
  } catch (err: any) {
    return { data: {} };
  }
};

export const callPostAddMenuApi = async (request: any) => {
  try {
    const { data } = await httpService
      .post(endpoints.addMenuEndpoint, request)
      .catch((err: any) => {
        console.log("eee::", err);
        return handleMyErrors(err);
      });
    return data;
  } catch (err: any) {
    return handleMyErrors(err);
  }
};
