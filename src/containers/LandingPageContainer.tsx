import UserAreaHeader from "../components/header/UserAreaHeader";

export default function LandingPageContainer({ children }: any) {
    return (
        <div className="flex flex-col h-screen">
            <div className="w-full">
                <UserAreaHeader />
            </div>
            <div className="w-full flex flex-grow justify-center items-center">
                {children}
            </div>
        </div>
    )
}