import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { urlPaths } from "./common/urlPaths";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <div className="App">
      <main className="border-none body-font font-flowCircular">
        <Suspense fallback="loading">
          <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Routes>
              <Route index element={<Login />} />
              <Route path={urlPaths.dashboard} element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
