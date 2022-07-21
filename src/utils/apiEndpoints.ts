export const endpoints = {
    authenticateUser: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/authenticate`,
    addUser: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User`,
    fetchUserByUsername: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/searchByUserName`,
    refreshTokenEndpoint: `${process.env.REACT_APP_PUBLIC_API_BASE_URL}/api/User/authenticate`
}
