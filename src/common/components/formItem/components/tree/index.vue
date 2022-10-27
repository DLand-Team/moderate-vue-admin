<template>
    <div>
        <a-tree v-model:checkedKeys="formValues[id]" @check="handleCheck" ref="treeRef" class="tree-demo"
            :draggable="false" blockNode :checkable="checked" :data="config?.treeOptions" @drop="onDrop" />
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watchEffect, type Ref } from 'vue';
import type { TreeNodeData } from '@arco-design/web-vue'
import type { FormItemT } from '../../index.vue';

const props = defineProps<{ formValues: any, formData: FormItemT }>()
// const { handleChange } = props;
const { formData, formValues } = toRefs(props)
const { id, config } = toRefs(formData.value);
const treeRef = ref()

const handleCheck = (checkKeys: string[]) => {
    // handleChange(checkKeys)
}

const checked = ref(true);
function onDrop({ dragNode, dropNode, dropPosition }: { dragNode: TreeNodeData, dropNode: TreeNodeData, dropPosition: number }) {
    const data = config?.value!.treeOptions;
    const loop = (data: TreeNodeData[], key: string | number, callback: (item: TreeNodeData, index: string | number, arr: TreeNodeData[]) => void) => {
        data.some((item, index, arr) => {
            if (item.key === key) {
                callback(item, index, arr);
                return true;
            }
            if (item.children) {
                return loop(item.children, key, callback);
            }
            return false;
        });
    };

    loop(data!, dragNode.key!, (_, index, arr) => {
        arr.splice(index as number, 1);
    });

    if (dropPosition === 0) {
        loop(data!, dropNode.key!, (item) => {
            item.children = item.children || [];
            item.children.push(dragNode);
        });
    } else {
        loop(data!, dropNode.key!, (_, index, arr) => {
            arr.splice(dropPosition < 0 ? index as number : (index as number) + 1, 0, dragNode);
        });
    }
}

</script>
<style scoped>
.tree-demo :deep(.tree-node-dropover)> :deep(.arco-tree-node-title),
.tree-demo :deep(.tree-node-dropover)> :deep(.arco-tree-node-title):hover {
    animation: blinkBg 0.4s 2;
}

@keyframes blinkBg {
    0% {
        background-color: transparent;
    }

    100% {
        background-color: var(--color-primary-light-1);
    }
}
</style>