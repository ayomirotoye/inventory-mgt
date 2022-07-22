import SpinnerIcon from "../../assets/gif/spinner.gif";

export default function SpinnerLoader({ isLoading = false }) {
    return (
        isLoading ? <span className="flex justify-center"> <img src={SpinnerIcon} alt="spinner icon" className="text-center" width="30" /></span> : <></>
    )
}