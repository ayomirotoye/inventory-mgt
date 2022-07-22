import { useEffect, useState } from "react";
import UserAreaHeader from "../components/header/UserAreaHeader";
import { useMediaQueryWrapper } from "../libs/hooks";
import Sidebar from "./sidebar/Index";

export default function DashboardContainer({ children }: any) {
    const { isSmallScreen } = useMediaQueryWrapper();
    const [, setScreenSize] = useState(isSmallScreen);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setScreenSize(isSmallScreen);
    }, [isSmallScreen]);

    useEffect(()=>{
        
    }, [])
    return (
        <div className="h-screen">
            <div className="sticky top-0 z-[10003]">
                <UserAreaHeader isLoggedIn={true}/>
            </div>
            <div className="grid grid-cols-12">
                <div className={'col-span-2 bg-primary-400 overflow-y-none px-3 h-screen'}>
                    <Sidebar />
                </div>
                <div className={'col-span-10 px-10 py-5 bg-gray-100 overflow-y-auto bg-gray-200 h-full'}>
                    {children}
                </div>
            </div>
        </div>
    )
}