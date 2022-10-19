import type { RouteRecordRaw } from "vue-router";
import { Hello, Group, Index } from "@/pages";

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
};

const { child_3 } = RouteIds;
const config: {
  [key in RouteKeyT]: Partial<RouteRecordRawCustom>;
} = {
  index: {
    component: Index,
  },
  parent_1: {
  },
  child_1: {
    component: Group,
  },
  child_2: {
    component: Hello,
    redirectName: child_3,
  },
  child_3: {
    component: Hello,
  },
  child_4: {
    component: Hello,
  },
};

export default config;
