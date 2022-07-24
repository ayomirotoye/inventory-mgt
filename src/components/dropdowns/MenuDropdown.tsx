import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { urlPaths } from '../../common/urlPaths'
import { hasKeys } from '../../libs/helper'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'
import MenuIconBars from '../icons/MenuIconBars'


export default function MenuDropdown({ menuList }: any) {
    const navigate = useNavigate();
    const [urlPath, setURLPath] = useState(urlPaths.dashboard);

    let routePath = useLocation().pathname;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setURLPath(routePath);
    }, [routePath])
    return (
        <div className="w-full text-right">

            {menuList?.menuData?.length > 0 ?

                <Menu as="div" className="">
                    <div>
                        <Menu.Button className="flex w-full justify-start items-center rounded-md py-2 text-sm font-medium hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            {hasKeys(menuList.hasIcon ?? {}) ? menuList.hasIcon.icon :
                                <MenuIconBars className='h-5 w-5' />}
                            <div className='hidden sm:block text-black hover:text-white focus:text-white ml-1'>{menuList?.menuTitle}</div>
                            <ChevronDownIcon
                                className="ml-2 -mr-1 h-5 w-5 text-black"
                                aria-hidden="true"
                                stroke="#000000"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="relative left-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                {menuList.menuData?.map((items: any, index: number) => {
                                    return (
                                        <Menu.Item key={`menu_items_${items.title?.concat("_", index)}`}>
                                            {({ active }) => (
                                                <Link to={items.link}>
                                                    <button
                                                        className={`${active ? 'bg-primary-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        <MenuIconBars
                                                            fill='black'
                                                            stroke='black'
                                                            className='h-5 w-5' />

                                                        <span className={`truncate ${active ? "text-white" : ""}`}> {items.title}</span>
                                                    </button>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )
                                })}

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                :
                <div onClick={menuList?.onClick} className={`flex justify-start space-x-1 cursor-pointer ${urlPath === menuList?.link ? "bg-primary-900 rounded-lg p-3 text-white" : "text-black"}`}>
                    <Link to={menuList?.link}>
                        {hasKeys(menuList.hasIcon ?? {}) ? menuList.hasIcon.icon : <MenuIconBars className='h-5 w-5' />}
                    </Link>
                    <div className='hidden sm:block truncate hover:text-white focus:text-white'
                        onClick={() => navigate(menuList?.link)}>
                        {menuList?.menuTitle}
                    </div>
                </div>}
        </div>
    )
}
