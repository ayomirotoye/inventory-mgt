import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { urlPaths } from "../common/urlPaths";
import Profile from "../pages/Profile";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";

const Login = lazy(() => import("./../pages/Login"));
const Home = lazy(() => import("./../pages/Home"));
const Dashboard = lazy(() => import("./../pages/Dashboard"));
const AuthRedirect = lazy(() => import("./../pages/AuthRedirect"));
const UserMgt = lazy(() => import("./../pages/userMgt"));
const RoleMgt = lazy(() => import("./../pages/roleMgt"));
const MenuMgt = lazy(() => import("./../pages/menuMgt"));
const DataMgt = lazy(() => import("./../pages/DataMgt"));
const UploadProduct = lazy(() => import("./../pages/product/UploadProduct"));
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
          <Route
            path={urlPaths.dashboard}
            element={
              <ProtectedRouteWrapper>
                <Dashboard />
              </ProtectedRouteWrapper>
            }
          />
          <Route
            path={urlPaths.users}
            element={
              <ProtectedRouteWrapper>
                <UserMgt />
              </ProtectedRouteWrapper>
            }
          />
          <Route
            path={urlPaths.roles}
            element={
              <ProtectedRouteWrapper>
                <RoleMgt />
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path={urlPaths.menus}
            element={
              <ProtectedRouteWrapper>
                <MenuMgt />
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path={urlPaths.data}
            element={
              <ProtectedRouteWrapper>
                <DataMgt />
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path={urlPaths.upload}
            element={
              <ProtectedRouteWrapper>
                <UploadProduct />
              </ProtectedRouteWrapper>
            }
          />

          <Route
            path={urlPaths.profile}
            element={
              <ProtectedRouteWrapper>
                <Profile />
              </ProtectedRouteWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
