import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";
import { handleMyErrors } from "./errorHandlingService";

export const callGetRolesApi = async () => {
  try {
    const { data } = await httpService
      .get(endpoints.fetchRolesEndpoint)
      .catch(() => {
        return { data: {} };
      });
    return data.data ?? {};
  } catch (err: any) {
    return { data: {} };
  }
};
export const callGetMenusByRoleIdApi = async (roleId: string) => {
  try {
    const { data } = await httpService
      .get(endpoints.menusByRoleIdEndpoint.concat("/", roleId))
      .catch(() => {
        return { data: {} };
      });
    return data ?? {};
  } catch (err: any) {
    return { data: {} };
  }
};

export const callDeleteRolesApi = async (userId: string) => {
  try {
    const { data } = await httpService
      .delete(endpoints.deleteRoleEndpoint.concat("/", userId))
      .catch(() => {
        return { data: {} };
      });
    return data ?? {};
  } catch (err: any) {
    return { data: {} };
  }
};

export const callPostAddRoleApi = async (request: any) => {
  try {
    const { data } = await httpService
      .post(endpoints.addRoleEndpoint, request)
      .catch((err: any) => {
        return handleMyErrors(err);
      });
    return data;
  } catch (err: any) {
    return handleMyErrors(err);
  }
};
export const callPutEditRoleApi = async (request: any) => {
  try {
    const { data } = await httpService
      .post(endpoints.addRoleEndpoint, request)
      .catch((err: any) => {
        return handleMyErrors(err);
      });
    return data;
  } catch (err: any) {
    return handleMyErrors(err);
  }
};
