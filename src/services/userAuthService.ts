import { isSuccessful } from "../libs/helper";
import httpService from "../networks/httpService";
import { endpoints } from "../utils/apiEndpoints";
import { handleMyErrors } from "./errorHandlingService";

export const callUserLoginApi = async (_data: any) => {
    try {

        const url = endpoints.authenticateUserEndpoint;
        const { data } = await httpService.post(url, _data).catch((err: any) => {
            const errBody = handleMyErrors(err);
            return { data: errBody }
        });
        console.log("datata:::", data);
        if (isSuccessful(data?.responseCode)) {
            // const jwtToken = data?.token;
            // const refreshToken = data.refreshToken;
            // tokenPersistenceFlow(jwtToken, refreshToken);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userDetails", JSON.stringify(data.data.profile));
        }
        return data;

    } catch (err: any) {
        httpService.setJwt("");
        console.log(
            "ERROR OCCURRED WHILE CONNECTING TO THE API AUTH SERVER:::",
            err
        );
        const errBody = handleMyErrors(err);
        return { data: errBody }
    }
};