import { theme } from "../../tailwind.config";
import { urlPaths } from "../../common/urlPaths";
import CustomMenuDropdown from "../../components/dropdowns/CustomMenuDropdown";
import { AdminIcon } from "../../components/icons/AdminIcon";
import { DashboardIcon } from "../../components/icons/DashboardIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import { ProductIcon } from "../../components/icons/ProductIcon";
import { UserIcon } from "../../components/icons/UserIcon";
import "./index.scss";

export const navbarItems = [
  {
    menuTitle: "Home",
    link: urlPaths.home,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Home",
      icon: (
        <DashboardIcon
          className="h-5 w-5"
          fill={theme.extend.colors.customRed}
          stroke={theme.extend.colors.customRed}
        />
      ),
    },
  },

  {
    menuTitle: "Dashboard",
    link: urlPaths.dashboard,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Dashboard",
      icon: (
        <DashboardIcon
          className="h-5 w-5"
          fill={theme.extend.colors.customRed}
          stroke={theme.extend.colors.customRed}
        />
      ),
    },
  },

  {
    menuTitle: "User Mgt.",
    link: urlPaths.users,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "User mgt",
      icon: (
        <EyeIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  {
    menuTitle: "Role Mgt.",
    link: urlPaths.roles,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Role mgt",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  {
    menuTitle: "Menu Mgt.",
    link: urlPaths.menus,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Menu mgt",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  {
    menuTitle: "Data Mgt.",
    link: urlPaths.data,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Data mgt",
      icon: (
        <EyeIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },

  {
    menuTitle: "Approvals",
    link: urlPaths.approvals,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Approvals",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },

  {
    menuTitle: "HotDesk Officer",
    link: urlPaths.hotdesk,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "HotDesk Officer",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  /* {
    menuTitle: "Warehouse Officer",
    link: urlPaths.warehouse,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Warehouse Officer",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },

  {
    menuTitle: "Inventory Officer",
    link: urlPaths.inventory,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Invent Rec Officer",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  {
    menuTitle: "Unclaimed Products",
    link: urlPaths.unclaimed,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Unclaimed Products",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  },
  {
    menuTitle: "Loan Product",
    link: urlPaths.loan,
    menuData: [],
    hasIcon: {
      val: true,
      alt: "Loan Product",
      icon: (
        <UserIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
  }, */
  {
    menuTitle: "Product Mgt.",
    link: urlPaths.products,
    hasIcon: {
      val: true,
      alt: "Product Mgt",
      icon: (
        <ProductIcon className="h-5 w-5" fill={theme.extend.colors.customRed} />
      ),
    },
    menuData: [
      {
        link: urlPaths.products.index,
        title: "listing",
        urlMatchers: [urlPaths.products.index],
      },
      {
        link: urlPaths.upload,
        title: "upload",
        urlMatchers: [urlPaths.upload],
      },
      {
        link: urlPaths.wells,
        title: "Wells",
        urlMatchers: [urlPaths.wells],
      },
      {
        link: urlPaths.hotdesk,
        title: "Hotdesk",
        urlMatchers: [urlPaths.hotdesk],
      },
    ],
  },
  {
    menuTitle: "Admin",
    hasIcon: {
      val: true,
      alt: "Admin",
      icon: (
        <AdminIcon className="h-5 w-5" stroke={theme.extend.colors.customRed} />
      ),
    },
    menuData: [
      {
        link: urlPaths.users,
        title: "User Mgt.",
        urlMatchers: [urlPaths.users],
      },
      {
        link: urlPaths.roles,
        title: "Role Mgt.",
        urlMatchers: [urlPaths.roles],
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div
      className={`h-screen fixed py-4 ease-in transition-medium overflow-x-none overflow-y-auto`}
    >
      <nav>
        {navbarItems.map((items: any, index: number) => {
          return (
            <div
              className={`my-5 lg:mt-5 lg:mx-5`}
              key={`menudropdown_${items?.menuTitle}_${index}`}
              id={`menudropdown_${items.menuTitle}_${index}`}
            >
              <CustomMenuDropdown menuList={items} />
            </div>
          );
        })}
      </nav>
    </div>
  );
}
