import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AuthRedirect = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const search = useLocation().search;

  const userId = new URLSearchParams(search).get("userId");
  const validationToken = new URLSearchParams(search).get("validateToken");

  React.useEffect(() => {
    if (userId && validationToken) {
      redirectUser();
    }
  }, [userId, validationToken]);

  const redirectUser = () => {
    if (userId && validationToken) {
      console.log("User Credentials", {
        userId,
        userName: userId?.split("\\")[1],
        validationToken,
      });

      dispatch({
        type: "LOGIN_USER",
        data: { userName: userId?.split("\\")[1] },
      });

      //Make a call to the second endpoint

      navigate("/");
    }
  };

  return <div> Authenticating</div>;
};

export default AuthRedirect;
