import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import { routes } from "./routers";

function LoginRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <Routes>
          {routes.map((item) => {
            return item.children ? (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              >
                {item.children.map((i) => (
                  <Route key={i.path} path={i.path} element={<i.component />} />
                ))}
              </Route>
            ) : (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default LoginRouter;
