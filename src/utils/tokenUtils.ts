
import { isNullOrUndefined, isEmptyString, isSuccessful } from "../libs/helper";
import httpService from "../networks/httpService";
import { handleMyErrors } from "../services/errorHandlingService";
import { endpoints } from "./apiEndpoints";
import { getValueFromUserDetail } from "./helpers";

let tokenCounterTimeoutId = -1;
export const tokenRefreshTimeout = tokenCounterTimeoutId;

export const doAuthentication = () => {
    let userLoginStatus = getValueFromUserDetail("isLoggedIn");
    if (userLoginStatus !== null && ["true", true].includes(userLoginStatus)) {
        return true;
    }
    return null;
};

export const parseJwt = (token: any) => {
    try {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (err) {
        return null;
    }
};

// export const tokenRequeryProcessing = (accessToken: string, refreshToken: string) => {

//     let _tDet = parseJwt(accessToken);
//     console.log("_tDet_tDet::", _tDet)
//     console.log("accessToken::", accessToken)
//     let expiresAt = _tDet?.exp;
//     let expiresAt_ms = expiresAt;
//     console.log("expiresAt_msexpiresAt_ms::", new Date(expiresAt_ms));
//     let nowNow = new Date().getTime();
//     // let tokenRequeryInterval = (expiresAt * 1000 - nowNow) * 0.8;
//     let tokenRequeryInterval = 60000;

//     sessionStorage.setItem('refreshToken', refreshToken);
//     sessionStorage.setItem("isLoggedIn", "true");
//     sessionStorage.setItem("nowNow", String(nowNow));
//     sessionStorage.setItem("expiresAt", expiresAt_ms);
//     sessionStorage.setItem("requeryTime", String(nowNow + tokenRequeryInterval));
//     sessionStorage.setItem("tokenRequeryInterval", String(tokenRequeryInterval));
//     keepTokenFresh();
//     return { tokenDetails: _tDet, tokenRequeryInterval: tokenRequeryInterval };
// };

function getRefreshToken() {
    let tokenVal = sessionStorage.getItem("refreshToken");
    return tokenVal;
}


const getTokenRefreshTime = () => {
    let interval = sessionStorage.getItem("tokenRequeryInterval")
    if (!isNullOrUndefined(interval)) {
        let time = Number(interval)
        return time - (Math.floor(time / 5))
    }
    return 180000
}

export const keepTokenFresh = async () => {
    setTimeout(() => {
        refreshToken()
    }, getTokenRefreshTime());
}

export const refreshToken = async () => {
    try {
        let refT = getRefreshToken();
        if (!isNullOrUndefined(refT) || !isEmptyString(refT)) {
            const options = {
                headers: {
                    "content-type": "application/json"
                },
            };
            const url = endpoints.refreshTokenEndpoint;
            const { data } = await httpService.post(
                url,
                {
                    "refreshToken": getRefreshToken()
                },
                options
            );

            if (isSuccessful(data.responseCode)) {
                const jwtToken = data.data.token;
                const refreshToken = data.data.refreshToken;
                tokenPersistenceFlow(jwtToken, refreshToken);
                return data;
            }
        }
    } catch (err) {
        httpService.setJwt("");
        return handleMyErrors(err);
    }
};


export const tokenPersistenceFlow = (accessToken: string, refreshToken: string) => {
    sessionStorage.setItem("refreshToken", refreshToken);
    httpService.setJwt(accessToken);
}

export const clearTimeouts = (timeOutId = 0) => {
    if (timeOutId > 0) {
        window.clearTimeout(timeOutId);
    } else {
        var noop = function () { },
            firstId = window.setTimeout(noop, 0);
        return function () {
            var lastId = window.setTimeout(noop, 0);
            console.log("Removing", lastId - firstId, "timeout handlers");
            while (firstId !== lastId) window.clearTimeout(++firstId);
        };
    }
};



