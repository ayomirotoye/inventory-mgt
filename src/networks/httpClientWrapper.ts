import axios, { AxiosInstance } from "axios";
import { handleMyErrors } from "../services/errorHandlingService";


let tokenCounterTimeoutId = -1;
export const tokenRefreshTimeout = tokenCounterTimeoutId;

axios.interceptors.response.use(
    function (successRes) {
        return successRes;
    },
    function (error: any) {
        if (error.response.status === 401) {
            sessionStorage.clear();
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export const getAxios = (axios: AxiosInstance) => {
    let token = localStorage.getItem("aislUserToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios;
}

const getMyAxios = async (url: string) => {
    return axios.get(url).catch((err) => {
        return { data: handleMyErrors(err) };
    });
}

const getPostAxios = async (url: string, _requestData: any, options = {}) => {

    return await axios.post(url, {
        "text": ""
    }, options as any).catch((err) => {
        return { data: handleMyErrors(err) };
    });
}
const getDeleteAxios = async (url: string) => {
    return await axios.delete(url);
}

const getPutAxios = async (url: string, _requestData: any) => {

    return await axios.put(url, {
        "text": ""
    });
}

function setJwt(jwt: string | null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export const httpServiceInterface = {
    myAxios: axios,
    setJwt: setJwt,
    get: getMyAxios,
    post: getPostAxios,
    put: getPutAxios,
    delete: getDeleteAxios,
};
