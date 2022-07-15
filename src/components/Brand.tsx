import { useNavigate } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import ViewText from "./texts/view-text";

export default function Brand({ brandText }: any) {
    const navigate= useNavigate();
    return (
        <header className="flex items-center py-4 md:px-6 md:space-x-3" onClick={()=>navigate(urlPaths.home)}>
            <div className="ml-3 mr-3 md:mr-0 lg:ml-0">
                <img src={require("../assets/images/shell-logo.png")}
                    alt="Shell Logo"
                    className={`w-6 h-6 md:w-10 md:h-10 mr-2`} />
            </div>
            <div className="hidden md:block">
                <ViewText size="sm:text-sm md:text-md text-lg" textValue={brandText} />
            </div>
        </header>
    )
}