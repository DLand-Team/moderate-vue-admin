import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import mockData from "./mockPermissions";

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
  return { menuData, getPermissionsData, setMenuData };
});
