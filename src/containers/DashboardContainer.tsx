import { useEffect, useState } from "react";
import PageHeader from "../components/header/PageHeader";
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
            <div className="grid grid-cols-12">
                <div className={'col-span-2 bg-white-100 overflow-y-auto px-3'}>
                    <Sidebar />
                </div>
                <div className={'col-span-10 px-10 py-24 bg-gray-100 overflow-y-auto'}>
                    <PageHeader
                        description={"Page header"}
                    />
                    {children}
                </div>
            </div>
        </>
    )
}