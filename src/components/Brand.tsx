import ViewText from "./texts/view-text";

export default function Brand({ brandText }: any) {
    return (
        <header className="md:flex md:items-center md:px-6 md:space-x-3">
            <div className="ml-3 lg:ml-0">
                <img src={require("../assets/images/shell-logo.png")} alt="Shell Logo" className={`w-20 sm:w-6 sm:h-6 md:w-20 md:h-20`} />
            </div>
            <div className="hidden md:block">
                <ViewText textValue={brandText} />
            </div>
        </header>
    )
}