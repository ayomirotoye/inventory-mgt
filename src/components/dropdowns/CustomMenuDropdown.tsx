import { useEffect, useState } from 'react'
import { BsChevronBarDown, BsChevronBarUp } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import colors from 'tailwindcss/colors'
import { urlPaths } from '../../common/urlPaths'
import { hasKeys } from '../../libs/helper'
import { theme } from '../../tailwind.config'
import MenuIconBars from '../icons/MenuIconBars'
import { ProductIcon } from '../icons/ProductIcon'
import MyPopoverMenu from '../MyPopoverMenu'


export default function CustomMenuDropdown({ menuList }: any) {
    const navigate = useNavigate();
    const [urlPath, setURLPath] = useState(urlPaths.dashboard);

    let routePath = useLocation().pathname;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setURLPath(routePath);
    }, [routePath])
    return (
        <div className="w-full text-left sidebarItem">

            {menuList?.menuData?.length > 0 ?
                <MyPopoverMenu
                    showTriggerComponent={{
                        whenOpen: <div className={`flex space-x-1 cursor-pointer items-center ${urlPath === menuList?.link && "bg-primary-900 rounded-lg p-3 text-white"}`}>
                            <ProductIcon className="h-5 w-5" strokeWidth={5} stroke={theme.extend.colors.customRed} />
                            <span>{menuList.menuTitle}</span>
                            <BsChevronBarUp strokeWidth={1} fill={colors.black} className="mt-2" /></div>,
                        whenHidden: <div className={`flex space-x-1 cursor-pointer items-center ${urlPath === menuList?.link && "bg-primary-900 rounded-lg p-3 text-white"}`}>
                            <ProductIcon className="h-5 w-5" strokeWidth={5} stroke={theme.extend.colors.customRed} />
                            <span>{menuList.menuTitle}</span>
                            <BsChevronBarDown strokeWidth={1} fill={colors.black} className="mt-2" /></div>
                    }}
                    panelWidth="sm:w-1/2 w-1/5"
                    listItems={menuList.menuData}
                    elementClassName="m-2 bg-none rounded-lg"
                />
                :
                <div onClick={menuList?.onClick} className={`flex justify-start space-x-1 cursor-pointer ${urlPath === menuList?.link && "bg-primary-900 rounded-lg p-3 text-white"}}`}>
                    <Link to={menuList?.link}>
                        {hasKeys(menuList.hasIcon ?? {}) ? menuList.hasIcon.icon : <MenuIconBars className='h-5 w-5' />}
                    </Link>
                    <div className='hidden sm:block truncate hover:text-red-900 focus:text-red-900'
                        onClick={() => navigate(menuList?.link)}>
                        {menuList?.menuTitle}
                    </div>
                </div>}
        </div>
    )
}
