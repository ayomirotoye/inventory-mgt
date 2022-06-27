export const urlPaths = {
    home: "/",
    dashboard: "/dashboard",
    roles: "/roles",
    approvals: "/approvals",
    products: "/products",
    wells:"/products/wells",
    hotdesk:"/products/hotdesk",
    users:"/users",
    admin:"/admin",
    report: "/report",
    logout: "/logout",
    wishlist: "/wishlist",
    ratings: "/ratings",
    orders: "/orders",
}

export const navbarItems = [
    {
        menuTitle: "Dashboard",
        link: urlPaths.dashboard,
        menuData: []
    },
    {
        menuTitle: "User Mgt.",
        link: urlPaths.users,
        menuData: [
        ]
    },
    {
        menuTitle: "Role Mgt.",
        link: urlPaths.roles,
        menuData: [
        ]
    },
    {
        menuTitle: "Approvals",
        link: urlPaths.approvals,
        menuData: []
    },
    {
        menuTitle: "Product Mgt.",
        link: urlPaths.products,
        menuData: [
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