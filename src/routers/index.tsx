import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import App from "../App";

interface RouteList {
  path: string;
  component: any;
  children?: RouteList[];
}

const routes: RouteList[] = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/books",
        component: lazy(() => import("../pages/booksInfo")),
      },
    ],
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/login")),
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/register")),
  },
];

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
