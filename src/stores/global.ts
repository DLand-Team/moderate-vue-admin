import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import mockData from "./mockPermissions";

export interface PermissionItemT {
  name:string
  meta:{
    title?: string
    icon?: string
    noCache?: boolean
    link?: null
  }
  children?:PermissionItemT[]
}

export const useGlobalStore = defineStore("global", () => {
  const menuData: any = ref([]);

  function setMenuData(data: any) {
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
