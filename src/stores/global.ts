import type { RouteItemDataT } from "@/router/index";
import { reactive, ref, type Component } from "vue";
import { defineStore } from "pinia";
import mockData from "./mockPermissions";

export interface PermissionItemT {
  name: string;
  meta: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: null;
  };
  children?: PermissionItemT[];
}

export const useGlobalStore = defineStore("global", () => {
  const menuData = ref<RouteItemDataT[]>([]);

  function setMenuData(data: RouteItemDataT[]) {
    menuData.value = data;
  }

  function getPermissionsData() {
    return new Promise<typeof mockData.data>((resolve) => {
      setTimeout(() => {
        resolve(mockData.data);
      }, 1000);
    });
  }
  // 获得所有的权限
  function getAllPermissionsData() {
    return new Promise<typeof mockData.data>((resolve) => {
      setTimeout(() => {
        resolve(mockData.data);
      }, 1000);
    });
  }
  return { menuData, getPermissionsData, setMenuData, getAllPermissionsData };
});
