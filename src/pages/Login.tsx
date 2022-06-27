import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import PrimaryButton from "../components/buttons/PrimaryButton";
import CustomInput from "../components/inputs/CustomInput";
import LandingPageContainer from "../containers/LandingPageContainer";
import { hasKeys } from "../libs/helper";
// import { useDeviceIp } from "../libs/hooks";

export default function Login() {
    const navigate = useNavigate();
    const [formErrors] = useState<any>({

    });
    const [values, setValues] = useState({
        "email": "",
        "password": "",
        "isForce": true,
        "deviceId": ""
    });
   
    // const [deviceIp] = useDeviceIp();

    function loginUser() {
        navigate(urlPaths.dashboard);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sessionStorage.clear();
    }, [])

    return <LandingPageContainer>
        <div className="border-4 border-secondary-500 p-5 w-96">
            <form className="form px-3">
                
                {!hasKeys(formErrors) ? <div className="mb-2">
                    <PrimaryButton
                        onClicked={loginUser}
                        buttonText="Login"
                    />
                </div> : []}

            </form>
        </div>
    </LandingPageContainer>
}