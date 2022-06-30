import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import PrimaryButton from "../components/buttons/PrimaryButton";
import LandingPageContainer from "../containers/LandingPageContainer";
import { hasKeys } from "../libs/helper";

export default function Login() {
    const navigate = useNavigate();
    const [formErrors] = useState<any>({

    });

    function loginUser() {
        navigate(urlPaths.dashboard);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sessionStorage.clear();
    }, [])

    return <LandingPageContainer>
        <div className="p-5 w-96">
            {!hasKeys(formErrors) ? <div className="mb-2">
                <PrimaryButton
                    onClicked={loginUser}
                    className="w-full font-bold bg-primary-400 text-black rounded-lg border-4 border-secondary-500 cursor-pointer"
                    buttonText="Login"
                />
            </div> : []}
        </div>
    </LandingPageContainer>
}