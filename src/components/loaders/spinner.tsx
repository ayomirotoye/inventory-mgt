import SpinnerIcon from "../../assets/gif/spinner.gif";

export default function SpinnerLoader({ isLoading = false }) {
    return (
        isLoading ? <img src={SpinnerIcon}
        className="align-middle"
            alt="spinner icon"
            width="30" /> : <></>
    )
}