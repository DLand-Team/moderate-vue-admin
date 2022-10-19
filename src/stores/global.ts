import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import mockData from "./mockPermissions";

export const useGlobalStore = defineStore("global", () => {
  const menuData: any = reactive({
    data: {},
  });

  function setMenuData(data: any) {
    debugger
    menuData.data = data;
  }

  function getPermissionsData() {
    return new Promise<typeof mockData.data>((resolve)=>{
      setTimeout(()=>{
        resolve(mockData.data);
      },1000)
    })
  }
  return { menuData, getPermissionsData, setMenuData };
});
