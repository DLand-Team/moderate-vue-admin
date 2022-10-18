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
import { NotFund, Index } from "../pages";
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
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: CenterLayout,
      children: [{ path: "/home/index", name: "index", component: Index }],
    },
  ],
});

const processRoute = (
  children: RouteRecordRaw[],
  persmissions: RouteItemDataT[],
  prefix: string
) => {
  persmissions.forEach((permission, index) => {
    const { name } = permission;
    let routeData = routesConfig[name as RouteKeyT] as RouteRecordRaw;
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

let flag = false;
export const processRoutes = (
  persmissions: RouteItemDataT[],
  routeData: RouteLocationNormalizedLoaded
) => {
  router.beforeEach((to, from, next) => {
    if (!flag) {
      flag = true;
      let data: { children: RouteRecordRawCustom[] } = {
        children: [],
      };
      processRoute(data.children, persmissions, "");
      processRouteTwice(data.children);
      debugger;
      data.children.forEach((item) => {
        router.addRoute("home", item);
      });
      router.addRoute("home", {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFund,
      });
      next({ ...to, replace: true });
    } else {
      next();
    }
  });
  // router.push(routeData.path);
  return Promise.resolve([
    { path: "/home/index", name: "index", component: NotFund },
    ...persmissions,
  ]);
};

export default router;

export const getRouteData = (name: string) => {
  return routesConfig[name as RouteKeyT];
};
