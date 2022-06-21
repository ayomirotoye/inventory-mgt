import { isNullOrUndefined, responseCodes, isObject, isEmptyString } from "../libs/helper";


let finalErrRes = {
  statusCode: "",
  data: Object.assign({}),
  hasError: true,
  message: ""
};
export const handleMyErrors = (err: any) => {
  try {
    console.log("ERRORR::", err);
    const errRes = err.response?.data;
    if (
      !isNullOrUndefined(errRes) &&
      errRes.error_description?.toString().includes("change default/initial")
    ) {
      finalErrRes = {
        ...finalErrRes,
        statusCode: responseCodes.BAD_REQUEST,
      };
    } else if (
      !isNullOrUndefined(errRes) &&
      errRes.error?.toString().includes("access_denied")
    ) {
      finalErrRes = {
        ...finalErrRes,
        statusCode: responseCodes.UNAUTHORIZED,
        message: "Unauthorized",
      };
      throw new Error(String(finalErrRes));
    } else if (
      !isNullOrUndefined(errRes) &&
      errRes.error?.toString().includes("invalid_grant")
    ) {
      finalErrRes = {
        ...finalErrRes,
        statusCode: responseCodes.UNAUTHORIZED,
        message: "Unauthorized",
      };
      throw new Error(String(finalErrRes));
    } else if (err.message?.includes("401")) {
      finalErrRes = {
        ...finalErrRes,
        message: "Unauthorized",
        statusCode: responseCodes.UNAUTHORIZED,
      };
    } else if (err.message?.includes("404")) {
      finalErrRes = {
        ...finalErrRes,
        statusCode: responseCodes.PAGE_NOT_FOUND,
        message: "No response from requested service as it is not found",
      };
    } else if (!isNullOrUndefined(err?.response) && isObject(err?.response)) {
      let errResData = err.response.data || {};
      let errResDataString = "";
      for (const [keys, values] of Object.entries(errResData)) {
        errResDataString += keys === "message" ? values : "";
      }
      if (errResDataString.includes("service unavailable")) {
        finalErrRes = {
          ...finalErrRes,
          statusCode: responseCodes.SERVICE_UNAVAILABLE,
          message: "Service unavailable",
        };
      } else
        finalErrRes = {
          ...finalErrRes,
          statusCode: responseCodes.BAD_REQUEST,
          message:
            isNullOrUndefined(errResDataString) ||
              errResDataString?.toLowerCase().includes("bad request")
              ? "Bad request"
              : !isEmptyString(errResDataString) ? errResDataString : "Failed",
        };
    } else {
      finalErrRes = {
        ...finalErrRes,
        statusCode: responseCodes.FAILED,
        message: err.message,
      };
    }
  } catch (err) {
    finalErrRes = {
      ...finalErrRes,
      statusCode: responseCodes.FAILED,
    };
    console.log("ERROR OCCURRED WHILE PARSING ERRORS=>", err);
  }
  return finalErrRes;
};
