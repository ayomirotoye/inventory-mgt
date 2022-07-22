import axios from "axios";
import { handleMyErrors } from "../services/errorHandlingService";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 120000;
axios.interceptors.request.use( (request) => {
  // const isAuthenticated = doAuthentication();
  // if (isAuthenticated && httpService.getJwt() === "") {
  //   await refreshToken();
  //   return request;
  // }
  return request;
});


axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const errorData = JSON.parse(JSON.stringify(error));
    // if (errorData.config.url) {
    //   const splitUrl = String(errorData.config.url).split("/");
    //   console.log("splitUrl::", splitUrl)
    //   if (containsAny(splitUrl, ["login", "refresh-token"]) &&  errorData.status === 401) {
    //     return Promise.reject(error);
    //   }else{
    //     refreshToken();
    //   }

    // }

    return Promise.reject(error);
  }
);

function setJwt(jwt: string | null) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

function getJwt(): string | null {
  return "";
}

const myGetAxios = async (url: string) => {
  return axios.get(url).catch((err) => {
    return { data: handleMyErrors(err) };
  });
}

const myPostAxios = async (url: string, requestData: any, options = {}) => {

  return await axios.post(url, requestData, options as any).catch((err) => {
    return { data: handleMyErrors(err) };
  });
}
const myDeleteAxios = async (url: string) => {
  return await axios.delete(url);
}

const myPutAxios = async (url: string, requestData?: any) => {

  return await axios.put(url, requestData);
}


const httpService = {
  get: myGetAxios,
  post: myPostAxios,
  put: myPutAxios,
  delete: myDeleteAxios,
  setJwt,
  getJwt,
};

export default httpService;
