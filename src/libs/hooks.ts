
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT_SUCCESSFUL } from "../state/actions/authAction";

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const doLogout = () => {
      dispatch({
        type: LOGOUT_SUCCESSFUL,
        payload: {},
      });
      return navigate("/");
    };
  
    return { doLogout };
  };