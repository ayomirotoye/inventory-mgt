import ViewText from "./texts/view-text";

export default function Brand({ brandText }: any) {
    return (
        <header className="flex items-center py-4 md:px-6 md:space-x-3">
            <div className="ml-3 lg:ml-0">
                <img src={require("../assets/images/shell-logo.png")}
                    alt="Shell Logo"
                    className={`w-6 h-6 md:w-10 md:h-10 mr-2`} />
            </div>
            <div className="">
                <ViewText textValue={brandText} />
            </div>
        </header>
    )
}