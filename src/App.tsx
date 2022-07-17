import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { urlPaths } from "./common/urlPaths";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserMgt = lazy(() => import("./pages/UserMgt"));
const RoleMgt = lazy(() => import("./pages/RoleMgt"));
const Approvals = lazy(() => import("./pages/approvals/index"));
const Profile = lazy(() => import("./pages/Profile"));
const Product = lazy(() => import("./pages/product"));
const AuthRedirect = lazy(() => import("./pages/AuthRedirect"));
const HotdeskTeam = lazy(() => import("./pages/HotdeskTeam"));
const WarehouseOfficer = lazy(() => import("./pages/approvals/index"));
const InventoryOfficer = lazy(() => import("./pages/approvals/index"));
const UpdateApprovalRoute = lazy(() => import("./pages/UpdateApprovalRoute"));

function App() {
  return (
    <div className="App">
      <main className="border-none body-font font-Futura">
        <Suspense fallback="loading">
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route index element={<Login />} />
              <Route path={urlPaths.home} element={<Home />} />
              <Route path={urlPaths.dashboard} element={<Dashboard />} />
              <Route path={urlPaths.users} element={<UserMgt />} />
              <Route path={urlPaths.roles} element={<RoleMgt />} />
              <Route path={urlPaths.approvals} element={<Approvals />} />
              <Route path={urlPaths.profile} element={<Profile />} />
              <Route path={urlPaths.products.index} element={<Product />} />
              <Route path={urlPaths.auth} element={<AuthRedirect />} />
              <Route path={urlPaths.hotdesk} element={<HotdeskTeam />} />
              <Route path={urlPaths.warehouse} element={<WarehouseOfficer />} />
              <Route path={urlPaths.inventory} element={<InventoryOfficer />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
