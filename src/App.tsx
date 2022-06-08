import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div className="App">
      <main className="border-none body-font font-flowCircular">
        <Suspense fallback="loading">
          <BrowserRouter basename={process.env.PUBLIC_URL} >
            <Routes>
              <Route index element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
