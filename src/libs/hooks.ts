
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT_SUCCESSFUL } from "../state/actions/authAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

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

const handleSmallScreenChange = (matches: boolean) => {
  return matches;
}

export const useMediaQueryWrapper = () => {

  const isSmallScreen = useMediaQuery({ maxWidth: 576 }, undefined, handleSmallScreenChange);
  const isMediumScreen = useMediaQuery({ query: `(max-width: 768px)` });
  const isLargeScreen = useMediaQuery({ query: "(min-device-width: 992px)" });
  const isExtraLargeScreen = useMediaQuery({ query: "(min-device-width: 1200px)" });
  const isExtraExtraLargeScreen = useMediaQuery({ query: "(min-device-width: 1400px)" });

  return {
    isLargeScreen,
    isSmallScreen,
    isMediumScreen,
    isExtraLargeScreen,
    isExtraExtraLargeScreen
  };
};

export const useDeviceIp = () => {
  const [ip, setIP] = useState('');
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/").then((data: any) => {
      setIP(data.IPv4)
    }).catch(() => {

    });

  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
  }, []);

  return [ip];
}
