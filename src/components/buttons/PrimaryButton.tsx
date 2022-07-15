import SpinnerIcon from "../../assets/gif/spinner.gif";
import { isNullOrUndefined } from "../../libs/helper";

const PrimaryButton = ({
    onClicked,
    buttonText,
    extraDivStyles = "w-full",
    isLoading = false,
    className = `w-full font-bold bg-primary-400 text-black rounded-lg border-0 cursor-pointer`,
    height="py-2",
    children=null
}: any) => {
    
    return (
        <div className={extraDivStyles}>
            <button
                disabled={isLoading}
                onClick={onClicked}
                type="button"
                className={className.concat(" ",height)}>{isLoading ?
                    <img src={SpinnerIcon}
                        alt="spinner icon"
                        className={isLoading ? "" : "hidden"} width="30" />
                    : !isNullOrUndefined(children) ? children : buttonText}</button>
        </div >
    );
}
export default PrimaryButton;