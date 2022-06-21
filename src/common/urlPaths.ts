export const urlPaths = {
    home: "/",
    dashboard: "/dashboard",
    products: "/products",
    wells:"/products/wells",
    hotdesk:"/products/hotdesk",
    users:"/users",
    report: "/report",
    settings: "/settings",
}

export const navbarItems = [
    {
        menuTitle: "Dashboard",
        menuData: []
    },
    {
        menuTitle: "Product Mgt.",
        menuData: [
            {
                link: urlPaths.wells,
                title: "Wells",
                urlMatchers: [urlPaths.dashboard]
            },
            {
                link: urlPaths.hotdesk,
                title: "Hotdesk",
                urlMatchers: [urlPaths.hotdesk]
            }
        ]
    },
    {
        menuTitle: "User Mgt.",
        menuData: [
            {
                link: urlPaths.users,
                title: "Add new",
                urlMatchers: [urlPaths.users]
            },
            {
                link: urlPaths.users,
                title: "All",
                urlMatchers: [urlPaths.users]
            }
        ]
    },
    {
        menuTitle: "Approvals",
        menuData: []
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
]