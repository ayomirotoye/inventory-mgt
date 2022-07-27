import { useState } from "react";
import { Link } from "react-router-dom";
import colors from "tailwindcss/colors";
import { urlPaths } from "../../common/urlPaths";
import Brand from "../Brand";
import CategoryDropdown from "../dropdowns/CategoryDropdown";
import { AvatarIcon } from "../icons/AvatarIcon";
import { CartIcon } from "../icons/CartIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { RatingsIcon } from "../icons/RatingsIcon";
import { UserIcon } from "../icons/UserIcon";
import { UserSettingsIcon } from "../icons/UserSettings";
import { WishlistIcon } from "../icons/WishlistIcon";
import SearchInput from "../inputs/SearchInput";
import MyPopover from "../MyPopover";

const menuIconItems = [
  {
    name: "Profile",
    href: urlPaths.profile,
    icon: (
      <UserIcon
        className="h-5 w-5"
        fill={colors.red[900]}
        stroke={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
  {
    name: "My Wishlist",
    href: "/",
    icon: (
      <WishlistIcon
        className="h-5 w-5"
        fill={colors.red[900]}
        stroke={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
  {
    name: "Shopping Cart",
    href: "/profile",
    icon: (
      <CartIcon
        className="h-5 w-5"
        fill={colors.red[900]}
        stroke={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
  {
    name: "Ratings and Reviews",
    href: "/profile",
    icon: (
      <RatingsIcon
        className="h-5 w-5"
        fill={colors.red[900]}
        stroke={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
  {
    name: "Items Pending Approval",
    href: "/itemspendingapproval",
    icon: (
      <UserSettingsIcon
        className="h-5 w-5"
        fill={colors.white}
        stroke={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
  {
    name: "Logout",
    href: "/",
    icon: (
      <LogoutIcon
        className="h-5 w-5 mt-1 hover:text-white"
        stroke={colors.red[900]}
        fill={colors.red[900]}
        strokeWidth={3}
      />
    ),
  },
];

const UserAreaHeader = ({ isLoggedIn = false }) => {
  const [values, setValues] = useState({
    query: "",
  });
  return (
    <div className="bg-primary-400 text-center py-1 flex justify-between">
      <Brand brandText="CMMTS" />
      {isLoggedIn ? (
        <div className="md:flex items-center md:py-3">
          <div className="md:w-1/4">
            <CategoryDropdown
              optionTitle="Category / Products"
              labelTitle=""
              isVisible={true}
              value=""
              onChange={(e: any) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <SearchInput widthClass="md:w-3/4" />
        </div>
      ) : (
        <div className="flex items-center md:py-3">
          <div className="font-bold text-xs md:text-xs">
            <span className="hidden md:block">
              CONSOLIDATED MATERIAL MANAGEMENT & TRACKING SYSTEM
            </span>
            <span>(CMMTS)</span>{" "}
          </div>
        </div>
      )}
      {isLoggedIn ? (
        <div className="font-bold pr-4 md:py-3 flex justify-between items-center space-x-6">
          <Link to="/profile?type=notification">
            <CartIcon fill="#000000" className="w-5 h-5" stroke="#000000" />
          </Link>
          <div>
            <MyPopover
              showContent={<AvatarIcon fill="red" className="h-10 w-10  " />}
              listItems={menuIconItems}
            />
          </div>
        </div>
      ) : (
        []
      )}
    </div>
  );
};

export default UserAreaHeader;
