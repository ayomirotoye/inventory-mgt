import { publicRequest } from "../actions/RequestMethod";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../reducers/authReducer";

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("User/authenticate", user);
    console.log("res.data::::" + res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
