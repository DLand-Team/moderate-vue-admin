import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import type { Component } from "vue";
import routesConfig from "./config";
import {
  routesData,
  type RouteRecordRawCustom,
  type RouteKeyT,
} from "@/permissions/routerConfig";

import { NotFund, Login } from "../pages";
import { CenterLayout } from "@/layouts";

let persmissions: any = [];
export interface RouteItemDataT {
  name: RouteKeyT;
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
  routesData: RouteItemDataT[],
  prefix: string
) => {
  routesData.forEach((routeItem, index) => {
    const { name } = routeItem;
    if (persmissions.includes(name)) {
      let routeData = routesConfig[name] as RouteRecordRaw;
      routeData.name = name;
      // 沿途记录，然后拼接成path
      routeData.path = prefix + "/" + name;
      children!.push(routeData);
      if (routeItem.children!?.length > 0) {
        routeData.children = [];
        processRoute(routeData.children, routeItem.children!, routeData.path);
      }
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

export const processRoutes = (per: any[]) => {
  persmissions = per;
  homePageRouteData.children = [];
  processRoute(homePageRouteData.children, routesData, homePageRouteData.path);
  processRouteTwice(homePageRouteData.children);
  router.addRoute(homePageRouteData);
  router.addRoute("home", {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFund,
  });
  router.push(window.location.pathname);
  return Promise.resolve(homePageRouteData.children);
};

export const getRouteData = (name: string) => {
  let data = routesConfig[name as RouteKeyT];
  return data as RouteRecordRaw;
};

export type { RouteRecordRawCustom } from "@/permissions/routerConfig";
export default router;
