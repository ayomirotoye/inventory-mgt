import SpinnerIcon from "../../assets/gif/spinner.gif";
import { isNullOrUndefined } from "../../libs/helper";
import SpinnerLoader from "../loaders/spinner";

const PrimaryButton = ({
    onClicked,
    buttonText,
    extraDivStyles = "w-full",
    isLoading = false,
    className = `w-full font-bold bg-primary-400 text-black rounded-lg border-0 cursor-pointer`,
    height = "py-2",
    children = null,
    disabled = false
}: any) => {

    return (
        <div className={extraDivStyles}>
            <button
                disabled={disabled}
                onClick={onClicked}
                type="button"
                className={className.concat(" ", height)}>{isLoading ?
                    <SpinnerLoader isLoading={isLoading} />
                    : !isNullOrUndefined(children) ? children : buttonText}</button>
        </div >
    );
}
export default PrimaryButton;