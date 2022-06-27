import Brand from "../components/Brand";

export default function LandingPageContainer({ children }: any) {
    return (
        <div className="grid grid-cols-12 gap-0 h-screen">
            <div className="col-span-12 md:col-span-6 bg-primary-400">
                <div className="flex flex-col md:h-screen h-1/4">
                    <div className="w-full flex flex-grow justify-center items-center">
                        <Brand brandText="CMMTS" />
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-6 bg-white">
                <div className="flex flex-col md:h-screen h-3/4">
                    <div className="w-full flex flex-grow justify-center items-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}