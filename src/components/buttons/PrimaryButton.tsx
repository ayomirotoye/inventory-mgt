import SpinnerIcon from "../../assets/gif/spinner.gif";

const PrimaryButton = ({
    onClicked,
    buttonText,
    extraDivStyles = "w-full",
    isLoading = false,
    className = "py-4 w-full font-bold bg-primary-400 text-black rounded-lg border-0 cursor-pointer"
}: any) => {
    
    return (
        <div className={extraDivStyles}>
            <button
                disabled={isLoading}
                onClick={onClicked}
                type="button"
                className={className}>{isLoading ?
                    <img src={SpinnerIcon}
                        alt="spinner icon"
                        className={isLoading ? "" : "hidden"} width="30" />
                    : buttonText}</button>
        </div >
    );
}
export default PrimaryButton;