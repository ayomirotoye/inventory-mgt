import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import PrimaryButton from "../components/buttons/PrimaryButton";
import CustomInput from "../components/inputs/CustomInput";
import PasswordInput from "../components/inputs/PasswordInput";
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
                <div className="mb-4">
                    <CustomInput
                        value={values.email}
                        hideableLabelText=""
                        fixedLabelText="Email"
                        onChange={(e: any) => {
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }}
                        type="email"
                        inputFontSize="md:text-sm"
                        name="email"
                        error={{
                            hasError: formErrors.email,
                            message: formErrors.email
                        }}
                    />
                </div>
                {/* <PasswordInput
                    className="mb-4"
                    onChange={(e: any) => setValues({ ...values, password: e.target.value })}
                /> */}

                {!hasKeys(formErrors) ? <div className="mb-2">
                    <PrimaryButton
                        onClicked={loginUser}
                        buttonText="Login"
                    />
                </div> : []}

                {/* <div className="text-center">
                    <div className="mb-2 text-right signup-text">
                        <Link to="/forgot" className=""><strong className="text-xs font-bold text-red-500 mr-2">Forgot Password</strong></Link>
                    </div>
                </div> */}
            </form>
        </div>
    </LandingPageContainer>
}