import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userInfoKey } from '../../common/globals';
import { getCustomerInfo } from '../../libs/helper';
import Brand from '../Brand';
import CategoryDropdown from '../dropdowns/CategoryDropdown';
import { CartIcon } from '../icons/CartIcon';
import SearchInput from '../inputs/SearchInput';



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
const UserAreaHeader = ({ isLoggedIn = false }) => {
    let authCustomerInfo = getCustomerInfo(userInfoKey);
    const [values, setValues] = useState({
        query: ""
    });
    let authCustomerFullname = authCustomerInfo?.firstName + ' ' + authCustomerInfo?.lastName;

    return (
        <div className='bg-primary-400 text-center py-1 flex justify-between'>
            <Brand brandText="CMMTS" />
            {isLoggedIn ?
                <div className='md:flex items-center md:py-3'>
                    <div className='md:w-1/4'>
                        <CategoryDropdown
                            optionTitle="Category / Products"
                            labelTitle=""
                            isVisible={true}
                            value={""}
                            onChange={(e: any) => setValues({ ...values, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <SearchInput
                        widthClass="md:w-3/4"
                    />
                </div> : <div className="flex items-center md:py-3">
                    <div className="font-bold text-xs md:text-xs"><span className="hidden md:block">CONSOLIDATED MATERIAL MANAGEMENT & TRACKING SYSTEM</span><span>(CMMTS)</span> </div>
                </div>}
            {isLoggedIn ?
                <div className="font-bold pr-4 md:py-3 flex justify-between items-center space-x-6">
                    <Link to="/profile?type=notification">
                        <CartIcon fill="#000000" className="w-5 h-5" stroke="#000000" />
                    </Link>
                    <span className="hidden md:block ml-2 font-small md:font-bold text-sm md:text-xl border-4 border-secondary-650 px-2 py-1 bg-green-100 rounded-full">
                        {authCustomerFullname.substring(0, 2)}
                    </span>
                </div> : []
            }
        </div>
    );
};

export default UserAreaHeader;