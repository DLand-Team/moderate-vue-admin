import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import mockData from "./mockPermissions";

export const useGlobalStore = defineStore("global", () => {
  const menuData: any = reactive({
    data: {},
  });

  function setMenuData(data: any) {
    menuData.data = data;
  }

  function getPermissionsData() {
    return Promise.resolve(mockData.data);
  }
  return { menuData, getPermissionsData, setMenuData };
});
