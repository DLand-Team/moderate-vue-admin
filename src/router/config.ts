import type { RouteRecordRaw } from "vue-router";
import { Hello, Group, Index,RoleMgr} from "@/pages";

const RouteIds = {
  index: "index",
  parent_1: "parent_1",
  child_1: "child_1",
  child_2: "child_2",
  child_3: "child_3",
  child_4: "child_4",
};

export type RouteKeyT = keyof typeof RouteIds;
export type RouteRecordRawCustom = RouteRecordRaw & {
  redirectName: string;
  title: string;
  children: RouteRecordRawCustom[];
};

const { child_3 } = RouteIds;
const config: {
  [key in RouteKeyT]: Partial<RouteRecordRawCustom>;
} = {
  index: {
    meta: {
      title: "首页",
    },
    component: Index,
  },
  parent_1: {
    meta: {
      title: "首页",
    },
    title: "分类1",
  },
  child_1: {
    meta: {
      title: "用户管理",
    },
    component: Group,
  },
  child_2: {
    meta: {
      title: "角色管理",
    },
    component: RoleMgr,
  },
  child_3: {
    meta: {
      title: "条目3",
    },
    component: Hello,
  },
  child_4: {
    meta: {
      title: "条目4",
    },
    component: Hello,
  },
};

export default config;
