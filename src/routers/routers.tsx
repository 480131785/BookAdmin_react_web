import React, { lazy } from "react";
import App from "../App";

interface RouteList {
  path: string;
  component: React.FC;
  children?: RouteList[];
}

export const routes: RouteList[] = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "/books",
        component: lazy(() => import("../pages/booksInfo")),
      },
      {
        path: "/user",
        component: lazy(() => import("../pages/userInfo")),
      },
      {
        path: "/borrow",
        component: lazy(() => import("../pages/borrowInfo")),
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
