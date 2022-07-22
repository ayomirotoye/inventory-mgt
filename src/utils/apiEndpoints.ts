export const endpoints = {
    authenticateUserEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/authenticate`,
    addUserEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User`,
    fetchUserByUsernameEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/searchByUserName`,
    refreshTokenEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/authenticate`,
    fetchRolesEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/Roles`
}
