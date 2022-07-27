import SpinnerIcon from "../../assets/gif/spinner.gif";

export default function SpinnerLoader() {
    return (
        <span className="flex justify-center">
            <img src={SpinnerIcon} alt="spinner icon" className="text-center" width="30" />
        </span>

    )
}