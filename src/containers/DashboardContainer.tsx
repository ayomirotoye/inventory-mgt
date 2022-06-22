import { useEffect, useState } from "react";
import Brand from "../components/Brand";
import PageHeader from "../components/header/PageHeader";
import UserAreaHeader from "../components/header/UserAreaHeader";
import SearchInput from "../components/inputs/SearchInput";
import { useMediaQueryWrapper } from "../libs/hooks";
import Sidebar from "./sidebar/Index";

export default function DashboardContainer({ children }: any) {
    const { isSmallScreen } = useMediaQueryWrapper();
    const [, setScreenSize] = useState(isSmallScreen);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setScreenSize(isSmallScreen);
    }, [isSmallScreen]);
    return (
        <>
            <div className="sticky top-0 z-10000">
                <UserAreaHeader isLoggedIn={true}/>
            </div>
            <div className="grid grid-cols-12">
                <div className={'col-span-2 bg-primary-400 overflow-y-none px-3'}>
                    <Sidebar />
                </div>
                <div className={'col-span-10 px-10 py-5 bg-gray-100 overflow-y-auto bg-gray-200'}>
                    {children}
                </div>
            </div>
        </>
    )
}