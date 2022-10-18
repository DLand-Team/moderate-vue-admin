<script setup lang="ts">
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { useRouter, useRoute } from 'vue-router'
import { watch, ref, onMounted } from 'vue'
import type { RouteItemDataT } from '@/router/index'
import MenuItem from './index.vue'

const router = useRouter()
const route = useRoute()

const { itemData } = defineProps<{
    itemData: RouteItemDataT
}>()

let pathTemp = route.path.slice(1);
let arr = pathTemp ? pathTemp.split("/") : [];
const memuData = ref<string[]>(arr)

const onClickMenuItem = (itemKey: string) => {
    router.push("/parent_1/" + itemKey)
}

onMounted(() => {
    getMenuData(route.path)
})

watch(() => route.path, (value, oldValue) => {
    getMenuData(value)
})

const getMenuData = (path: string) => {
}

const hasOneShowingChild = (children: RouteItemDataT[] = [], parent: RouteItemDataT) => {
    if (!children) {
        children = [];
    }
    const showingChildren = children.filter((item: RouteItemDataT) => {
        if (item.hidden) {
            return false
        } else {
            return true
        }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
        return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
        return true
    }

    return false
}

</script>
    
<template>
    <template v-if="hasOneShowingChild(itemData.children,itemData)">
        <a-menu-item :key="itemData.name">{{itemData.name}}</a-menu-item>
    </template>
    <a-sub-menu v-else :key="itemData.name">
        <template #title>
            <IconCalendar></IconCalendar> Navigat ion 4
        </template>
        <MenuItem v-for="child in itemData.children" :itemData="child" :key="child.name">
        </MenuItem>
    </a-sub-menu>
</template>
    
    
<style scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: 600px;
    padding: 40px;
    background-color: var(--color-neutral-2);
}
</style>