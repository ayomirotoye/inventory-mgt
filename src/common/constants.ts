export const alertTimeOutInMs= 5000;
export const responseCodes = {
    NO_RECORD_FOUND: "25",
    INACTIVE_USER: "06",
    FAILED: "01",
    SUCCESSFUL: "00",
    BAD_REQUEST: "400",
    UNAUTHORIZED: "401",
    INVALID_GRANT: "INVALID_GRANT",
    SERVICE_UNAVAILABLE: "503",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    ERROR_OCCURRED: "ERROR OCCURRED",
    ACCESS_DENIED: "ACCESS DENIED",
    PAGE_NOT_FOUND: "404",
};
export const responseMessages = {
    SUCCESSFUL: "Successful",
    ACCESS_DENIED: "You do not have access to this resource",
    BAD_REQUEST: "There is something wrong with this request",
    INVALID_GRANT: "There is something wrong with your credentials",
    REQUEST_COULD_NOT_BEEN_AUTHENTICATED: "Auth token expired or not available",
    SERVICE_UNAVAILABLE: "Service unavailable",
    OPERATION_NOT_SUPPORTED: "Operation not supported"
};

export const pageFlows = {
    forgotPassword: {
        first: "INITIATE"
    }
}

export const tnxPinLength = 6;

export const urlPaths={
    home:"/",
    dashboard:"/dashboard",
    paymentStatus:"/payment-status",
    about:"/about",
    contactUs:"/contact-us",
    login:"/login"
}