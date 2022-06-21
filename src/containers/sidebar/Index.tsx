import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navbarItems, urlPaths } from "../../common/urlPaths";
import MenuDropdown from "../../components/dropdowns/MenuDropdown";
import { useMediaQueryWrapper } from "../../libs/hooks";
import './index.scss';


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
        <div className={`h-screen py-4 ease-in transition-medium overflow-x-none`}>
            <nav>
                {
                    navbarItems.map((items: any, index: number) => {
                        return <div className='mt-5 md:mx-5' key={`menudropdown_${items.title}_${index}`} id={`menudropdown_${items.title}_${index}`}>
                            <MenuDropdown menuList={items} />
                        </div>
                    })
                }
            </nav>
        </div>
    );
}