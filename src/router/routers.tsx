/*
 * @Author: 鲁田文
 * @Date: 2021-03-31 14:22:13
 * @LastEditTime: 2021-03-31 20:50:38
 * @LastEditors: 鲁田文
 * @Description:
 */
import { format } from "path";
import { lazy } from "react";
import { RoutesOption } from "./index";

const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/home"));

const routes: RoutesOption[] = [
  {
    path: "/login",
    component: Login,
    title: "登录",
  },
  {
    path: "/home",
    component: Home,
    title: "首页",
  },
  {
    path: "/auth",
    component: Login,
    title: "权限",
    children: [
      {
        path: "/activity",
        component: Login,
        title: "活动1",
      },
      {
        path: "/activity",
        component: Login,
        title: "活动2",
      },
    ],
  },
  {
    path: "/activity",
    component: Login,
    title: "活动",
  },
];

export default routes;
