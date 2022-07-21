import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { responseMessages } from "../common/constants";
import Alert from "../components/alerts/Alert";
import { isSuccessful } from "../libs/helper";
import { callUserLoginApi } from "../services/userAuthService";

const AuthRedirect = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const search = useLocation().search;

  const userId = new URLSearchParams(search).get("userId");
  const validationToken = new URLSearchParams(search).get("validationToken");

  React.useEffect(() => {
    console.log("User Credentials", {
      userId,
      userName: userId?.split("\\")[1],
      validationToken,
    });
    if (userId && validationToken) {
      redirectUser({
        "userId": userId,
        "validationToken": validationToken
      });
    }
  }, [userId, validationToken]);

  const redirectUser = (loginRequest: any) => {

    callUserLoginApi(loginRequest).then((response) => {
      console.log("lOGIN rESPONSE:::", response);
      if (isSuccessful(response.responseCode)) {
        dispatch({
          type: "LOGIN_USER",
          data: { userName: userId?.split("\\")[1] },
        });
        //Make a call to the second endpoint
        navigate("/dashboard");
      } else {
        toast.custom((t) => <Alert type="failed" t={t} message={response?.message ?? responseMessages.BAD_REQUEST} />, {
          position: 'top-center',
        });
        sessionStorage.clear();
        navigate("/");
      }
    });


  };

  return <div> Authenticating</div>;
};

export default AuthRedirect;
