export const urlPaths = {
    home: "/",
    dashboard: "/dashboard",
    roles: "/roles",
    approvals: "/approvals",
    products: "/products",
    wells:"/products/wells",
    hotdesk:"/products/hotdesk",
    users:"/users",
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
                link: urlPaths.users,
                title: "Manage users",
                urlMatchers: [urlPaths.users]
            },
            {
                link: urlPaths.users,
                title: "Manage products",
                urlMatchers: [urlPaths.users]
            }
        ]
    },
    {
        menuTitle: "Settings",
        menuData: [
            {
                link: urlPaths.orders,
                title: "My orders",
                urlMatchers: [urlPaths.orders]
            },
            {
                link: urlPaths.wishlist,
                title: "My wishlist",
                urlMatchers: [urlPaths.wishlist]
            },
            {
                link: urlPaths.ratings,
                title: "Ratings and Reviews",
                urlMatchers: [urlPaths.ratings]
            },
            {
                link: urlPaths.logout,
                title: "Logout",
                urlMatchers: [urlPaths.logout]
            }
        ]
    },
]