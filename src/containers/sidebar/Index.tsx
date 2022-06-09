import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { urlPaths } from "../../common/urlPaths";
import Brand from "../../components/Brand";
import { DashboardIcon } from "../../components/icons/DashboardIcon";
import { ProductIcon } from "../../components/icons/ProductIcon";
import { ReportIcon } from "../../components/icons/ReportIcon";
import { SettingsIcon } from "../../components/icons/SettingsIcon";
import { isNullOrUndefined } from "../../libs/helper";
import { useMediaQueryWrapper } from "../../libs/hooks";
import './index.scss';

const checkMatch = (items: any, urlPath: string) => {
    return isNullOrUndefined(items.urlPatterns)
        ? items.urlMatchers.includes(urlPath) : items.urlPatterns.test(urlPath)
}

const sidebarItems = [
    {
        link: "/dashboard",
        title: "Home",
        pageActiveIcon: DashboardIcon,
        pageInactiveIcon: DashboardIcon,
        urlMatchers: [urlPaths.dashboard]
    },
    {
        link: "/products",
        title: "Products",
        pageActiveIcon: ProductIcon,
        pageInactiveIcon: ProductIcon,
        urlMatchers: [urlPaths.products]
    },
    {
        link: "/report",
        title: "Report",
        pageActiveIcon: ReportIcon,
        pageInactiveIcon: ReportIcon,
        urlMatchers: [urlPaths.report]
    },
    {
        link: "/settings",
        title: "Settings",
        pageActiveIcon: SettingsIcon,
        pageInactiveIcon: SettingsIcon,
        urlMatchers: [urlPaths.settings]
    },
]

export default function Sidebar() {

    const { isSmallScreen } = useMediaQueryWrapper();
    const [urlPath, setURLPath] = useState(urlPaths.dashboard);
    const [, setShowSidebar] = useState('hide');

    let routePath = useLocation().pathname;

    async function getURLPath() {
        setURLPath(routePath);
    }


    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        let intervalId: NodeJS.Timeout;
        function toggleSidebar() {
            intervalId = setInterval(() => {
                setShowSidebar(sessionStorage.getItem("aislToggleSidebar") as string);
            }, 100);
        }
        getURLPath();
        toggleSidebar();

        return () => {
            clearInterval(intervalId)
        }
    }, [isSmallScreen]);

    return (
        // lg:static lg:translate-x-0 -translate-x-full py-4 lg:inset-auto ease-in transition-medium col-span-2 h-screen sticky top-0
        <div className={`h-screen sticky top-0 py-4 ease-in transition-medium`}>
            <Brand brandText="CMMTS"/>
            <nav>
                <div className='mt-10 md:mx-5'>
                    {
                        sidebarItems.map((items: any, index: number) => {
                            let check = checkMatch(items, urlPath);
                            return <Link key={`sidebar_items_${index}`} to={items.link} className={`mx-3 py-2 mb-2 flex items-center justify-between text-sm font-medium rounded-lg hover:bg-primary-100 ${check ? "bg-primary-100 sidebar-active font-bold w-full" : ""}`}>
                                <span className="inline-flex items-center">
                                    <span className="" >{<items.pageActiveIcon/>}</span>
                                    <span className="ml-2 text-gray-700 hidden sm:block">{items.title}</span>
                                </span>
                            </Link>
                        })
                    }
                </div>
            </nav>
        </div>
    );
}