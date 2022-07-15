import Brand from "../components/Brand";
import ViewText from "../components/texts/view-text";

export default function LandingPageContainer({ children }: any) {
    return (
        <div className="grid grid-cols-12 gap-0 h-screen">
            <div className="col-span-12 md:col-span-6">
                <div className="flex flex-col md:h-screen h-1/4 landing-page">
                    <div className="w-full flex flex-grow justify-center items-center bg-black/60">
                        <ViewText color="text-white" size="text-2xl" textValue="Welcome to CMMTS" />
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-6 bg-white">
                <div className="absolute right-4">
                    <Brand />
                </div>
                <div className="flex flex-col md:h-screen h-3/4">
                    <div className="w-full flex flex-grow justify-center items-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}