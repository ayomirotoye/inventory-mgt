import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userInfoKey } from '../../common/globals';
import { getCustomerInfo } from '../../libs/helper';
import { useLogout } from '../../libs/hooks';
import Brand from '../Brand';



let PhoneBlackIcon = require('../../assets/icons/phone-black.svg').default;
let SecurityIcon = require('../../assets/icons/security.svg').default;
let LogoutIcon = require('../../assets/icons/logout.svg').default;

const dropdownLinks = [
    {
        linkTo: "/learn?type=contactus",
        icon: PhoneBlackIcon,
        text: "Contact"
    },
    {
        linkTo: "/profile?type=security",
        icon: SecurityIcon,
        text: "Security"
    }
]
const UserAreaHeader = () => {
    const { doLogout } = useLogout();
    let authCustomerInfo = getCustomerInfo(userInfoKey);
    let authCustomerFullname = authCustomerInfo?.firstName + ' ' + authCustomerInfo?.lastName;

    const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);

    function toggleHeaderMenu() {

        if (showHeaderMenu) {
            setShowHeaderMenu(false)
        }
        else {
            setShowHeaderMenu(true)
        }
    }

    return (
        <div className='bg-primary-400 text-center py-2 flex justify-between'>
            <Brand />
            <div className="flex items-center md:py-3">
                <div className="font-bold text-xs md:text-xs"><span className="hidden md:block">CONSOLIDATED MATERIAL MANAGEMENT & TRACKING SYSTEM</span><span>(CMMTS)</span> </div>
            </div>
            <div className="font-bold pr-6 md:py-3 flex items-center">
                <Link to="/profile?type=notification" className='bg-transparent border-0'>
                    <img src={require("../../assets/icons/notification.svg").default} alt="bell" style={{ width: '2rem' }} />
                </Link>

                <div className="ml-3 relative" onClick={toggleHeaderMenu}>
                    <button className="cursor-pointer bg-transparent border-0 relative flex items-center focus:outline-none">
                        <span className="hidden md:block ml-2 font-small md:font-bold text-sm md:text-xl border-4 border-secondary-650 px-2 py-1  bg-green-100 rounded-full">
                            {authCustomerFullname.substring(0, 2)}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="ml-1 h-10 w-10 md:h-6 md:w-6 fill-current text-gray-700">
                            <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"></path>
                        </svg>
                    </button>

                    <div className={showHeaderMenu ? 'absolute bg-white rounded w-full border shadow-sm' : 'hidden'} style={{ top: '110%' }}>
                        <div className='md:px-3 py-2 text-sm'>
                            {dropdownLinks.map((items: any, index: number) => {
                                return <div className='hover:bg-gray-100 hover:font-bold px-1 md:pl-1 pr-2 rounded py-2' key={`header_links_${index}`}>
                                    <Link to={items.linkTo} className='no-underline text-black hover:text-green-900'>
                                        <div className='md:flex justify-center'>
                                            <img src={items.icon} alt="" className='object-contain h-6 w-6' />
                                            <div className='hidden md:block text-sm'> {items.text}</div>
                                        </div>
                                    </Link>
                                </div>
                            })}
                            <div className='hover:bg-gray-100 hover:font-bold px-1 md:pl-1 pr-2 rounded py-2'>
                                <div className='md:flex justify-center' onClick={doLogout}>
                                    <img src={LogoutIcon} alt="" className='object-contain h-6 w-6' />
                                    <div className='hidden md:block text-sm'> Logout</div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAreaHeader;