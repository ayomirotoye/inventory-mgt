import { urlPaths } from "../../common/urlPaths";
import MenuDropdown from "../../components/dropdowns/MenuDropdown";
import { AdminIcon } from "../../components/icons/AdminIcon";
import { DashboardIcon } from "../../components/icons/DashboardIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import { ProductIcon } from "../../components/icons/ProductIcon";
import { UserIcon } from "../../components/icons/UserIcon";
import { theme } from "../../tailwind.config";
import './index.scss';

export const navbarItems = [
    {
        menuTitle: "Dashboard",
        link: urlPaths.dashboard,
        menuData: [],
        hasIcon: {
            val: true,
            alt: 'Dashboard',
            icon: <DashboardIcon className="h-5 w-5" fill={theme.extend.colors.red[650]} stroke={theme.extend.colors.red[650]}  />
        }
    },
    {
        menuTitle: "User Mgt.",
        link: urlPaths.users,
        menuData: [
        ],
        hasIcon: {
            val: true,
            alt: 'User mgt',
            icon: <EyeIcon className="h-5 w-5" fill={theme.extend.colors.red[650]} />
        }
    },
    {
        menuTitle: "Role Mgt.",
        link: urlPaths.roles,
        menuData: [
        ],
        hasIcon: {
            val: true,
            alt: 'Role mgt',
            icon: <UserIcon className="h-5 w-5" fill={theme.extend.colors.red[650]} />
        }
    },
    {
        menuTitle: "Approvals",
        link: urlPaths.approvals,
        menuData: [],
        hasIcon: {
            val: true,
            alt: 'Approvals',
            icon: <UserIcon className="h-5 w-5" fill={theme.extend.colors.red[650]} />
        }
    },
    {
        menuTitle: "Product Mgt.",
        link: urlPaths.products,
        hasIcon: {
            val: true,
            alt: 'Product Mgt',
            icon: <ProductIcon className="h-5 w-5" fill={theme.extend.colors.red[650]} />
        },
        menuData: [
            {
                link: urlPaths.products.index,
                title: "listing",
                urlMatchers: [urlPaths.products.index]
            },
            {
                link: urlPaths.wells,
                title: "Wells",
                urlMatchers: [urlPaths.wells]
            },
            {
                link: urlPaths.hotdesk,
                title: "Hotdesk",
                urlMatchers: [urlPaths.hotdesk]
            }
        ]
    },
    {
        menuTitle: "Admin",
        hasIcon: {
            val: true,
            alt: 'Admin',
            icon: <AdminIcon className="h-5 w-5" stroke={theme.extend.colors.red[650]} />
        },
        menuData: [
            {
                link: urlPaths.admin,
                title: "Manage users",
                urlMatchers: [urlPaths.admin]
            },
            {
                link: urlPaths.products,
                title: "Manage products",
                urlMatchers: [urlPaths.products]
            }
        ]
    }
]

export default function Sidebar() {
    return (
        <div className={`h-screen fixed py-4 ease-in transition-medium overflow-x-none overflow-y-auto`}>
            <nav>
                {
                    navbarItems.map((items: any, index: number) => {
                        return <div className={`my-5 lg:mt-5 lg:mx-5`} key={`menudropdown_${items?.menuTitle}_${index}`} id={`menudropdown_${items.menuTitle}_${index}`}>
                            <MenuDropdown menuList={items} />
                        </div>
                    })
                }
            </nav>
        </div>
    );
}