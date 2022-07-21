import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";


const Login = lazy(() => import("./../pages/Login"));
const Home = lazy(() => import("./../pages/Home"));
const Dashboard = lazy(() => import("./../pages/Dashboard"));
const AuthRedirect = lazy(() => import("./../pages/AuthRedirect"));
const UserMgt = lazy(() => import("./../pages/userMgt"));
// const UserMgt = lazy(() => import("./../pages/UserMgt"));
// const RoleMgt = lazy(() => import("./../pages/RoleMgt"));
// const Approvals = lazy(() => import("./../pages/approvals/index"));
// const Profile = lazy(() => import("./../pages/Profile"));
// const Product = lazy(() => import("./../pages/product"));
// const HotdeskTeam = lazy(() => import("./../pages/HotdeskTeam"));
// const WarehouseOfficer = lazy(() => import("./../pages/approvals/index"));
// const InventoryOfficer = lazy(() => import("./../pages/approvals/index"));



const AppRoutes = () => {

    return (
        <Suspense fallback="loading">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path={urlPaths.home} element={<Home />} />
                    <Route path={urlPaths.auth} element={<AuthRedirect />} />
                    <Route path={urlPaths.dashboard} element={
                        <ProtectedRouteWrapper>
                            <Dashboard />
                        </ProtectedRouteWrapper>}
                    />
                    <Route path={urlPaths.users} element={
                        <ProtectedRouteWrapper>
                            <UserMgt />
                        </ProtectedRouteWrapper>}
                    />

                </Routes>
            </BrowserRouter >
        </Suspense >
    )
}

export default AppRoutes;