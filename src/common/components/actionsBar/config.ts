export type ItemT = { id: symbol; code: number; title: string; color: string };
type BTN_TYPET = {
  [key: string]: Partial<ItemT>;
};

const processData = (data: BTN_TYPET) => {
  let num = 0;
  for (let key in data) {
    const item = data[key];
    item.code = 2 ** num;
    num++;
  }
  return data;
};

export const BTN_TYPE = processData({
  ADD: { id: Symbol(), title: "添加", color: "#EAF4FE" },
  EDIT: { id: Symbol(), title: "编辑", color: "#EBF9F1" },
  DELETE: { id: Symbol(), title: "删除", color: "#FCEEED" },
  IMPORT: { id: Symbol(), title: "导入", color: "#FEF8E8" },
  EXPORT: { id: Symbol(), title: "导出", color: "#FEF8E8" },
}) as {
  [key: string]: ItemT;
};
