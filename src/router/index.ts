import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Component } from "vue";
import routesConfig, {
  type RouteKeyT,
  type RouteRecordRawCustom,
} from "./config";

import { NotFund, Login } from "../pages";
import { LoginLayout, CenterLayout } from "@/layouts";

export interface RouteItemDataT {
  name: string;
  path?: string;
  hidden?: Boolean;
  redirect?: string;
  component?: Component;
  alwaysShow?: boolean;
  meta?: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: string | null;
  };
  children?: RouteItemDataT[];
}
let loginPage = {
  path: "/",
  name: "login",
  title: "登录",
  component: Login,
};
let homePageRouteData = {
  path: "/home",
  name: "home",
  title: "中心",
  redirect: "/home/index",
  component: CenterLayout,
  children: [],
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [loginPage, homePageRouteData],
});

const processRoute = (
  children: RouteRecordRaw[],
  persmissions: RouteItemDataT[],
  prefix: string
) => {
  persmissions.forEach((permission, index) => {
    const { name } = permission;
    let routeData = routesConfig[name as RouteKeyT] as RouteRecordRaw;
    routeData.name = name;
    // 沿途记录，然后拼接成path
    routeData.path = prefix + "/" + name;
    children!.push(routeData);
    if (permission.children!?.length > 0) {
      routeData.children = [];
      processRoute(routeData.children, permission.children!, routeData.path);
    }
  });
};

const processRouteTwice = (routesData: RouteRecordRawCustom[]) => {
  routesData.forEach((routeItem) => {
    const { redirectName } = routeItem;
    if (redirectName) {
      routeItem.redirect = getRouteData(redirectName).path;
      Reflect.deleteProperty(routeItem, "redirectName");
    }
    if (routeItem.children) {
      processRouteTwice(routeItem.children as RouteRecordRawCustom[]);
    }
  });
};

export const processRoutes = (
  persmissions: RouteItemDataT[],
  routeData: RouteLocationNormalizedLoaded
) => {
  processRoute(
    homePageRouteData.children,
    persmissions,
    homePageRouteData.path
  );
  processRouteTwice(homePageRouteData.children);
  router.addRoute(homePageRouteData);
  router.addRoute("home", {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFund,
  });
  router.push(routeData.fullPath);
  return Promise.resolve(persmissions);
};

export default router;

export const getRouteData = (name: string) => {
  let data = routesConfig[name as RouteKeyT];
  return data as RouteRecordRaw;
};

export type { RouteRecordRawCustom } from "./config";
