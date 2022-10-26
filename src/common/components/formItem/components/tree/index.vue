<template>
    <div>
        <a-tree class="tree-demo" draggable blockNode :checkable="checked" :data="treeData" @drop="onDrop" />
    </div>

</template>
<script lang="ts">
import { ref } from 'vue';
import type { TreeNodeData } from '@arco-design/web-vue'
export default {
    setup() {
        const treeData = ref(defaultTreeData);
        const checkedKeys = ref([]);
        const checked = ref(true);
        return {
            treeData,
            checkedKeys,
            checked,
            onDrop({ dragNode, dropNode, dropPosition }: { dragNode: TreeNodeData, dropNode: TreeNodeData, dropPosition: number }) {
                const data = treeData.value;
                const loop = (data: TreeNodeData[], key: string | number, callback: (item: TreeNodeData, index: string | number, arr: TreeNodeData[

                ]) => void) => {
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

                loop(data, dragNode.key!, (_, index, arr) => {
                    arr.splice(index as number, 1);
                });

                if (dropPosition === 0) {
                    loop(data, dropNode.key!, (item) => {
                        item.children = item.children || [];
                        item.children.push(dragNode);
                    });
                } else {
                    loop(data, dropNode.key!, (_, index, arr) => {
                        arr.splice(dropPosition < 0 ? index as number : (index as number) + 1, 0, dragNode);
                    });
                }
            }
        };
    }
};

const defaultTreeData: TreeNodeData[] = [
    {
        title: 'Trunk 0-0',
        key: '0-0',
        children: [
            {
                title: 'Leaf 0-0-1',
                key: '0-0-1',
            },
            {
                title: 'Branch 0-0-2',
                key: '0-0-2',
                disableCheckbox: true,
                children: [
                    {
                        draggable: false,
                        title: 'Leaf 0-0-2-1 (Drag disabled)',
                        key: '0-0-2-1'
                    }
                ]
            },
        ],
    },
    {
        title: 'Trunk 0-1',
        key: '0-1',
        children: [
            {
                title: 'Branch 0-1-1',
                key: '0-1-1',
                checkable: false,
                children: [
                    {
                        title: 'Leaf 0-1-1-1',
                        key: '0-1-1-1',
                    },
                    {
                        title: 'Leaf 0-1-1-2',
                        key: '0-1-1-2',
                    },
                ]
            },
            {
                title: 'Leaf 0-1-2',
                key: '0-1-2',
            },
        ],
    },
]
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