<script setup lang="ts">
import {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { useRouter, useRoute } from 'vue-router'
import { watch, ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const memuData = ref<string[]>(["parent_1", "child_1"])

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
    let arr = path.slice(1).split("/");
    memuData.value = arr
}

</script>
    
<template>
    <a-layout-sider collapsible breakpoint="xl">
        <div class="logo" />
        <a-menu :openKeys="[memuData[0]]" :selectedKeys="[memuData[1]]" :style="{ width: '100%' }"
            @menu-item-click="onClickMenuItem">
            <a-sub-menu key="parent_1">
                <template #title>
                    <IconCalendar></IconCalendar> Navigation 4
                </template>
                <a-menu-item key="child_1">Menu 1</a-menu-item>
                <a-menu-item key="child_2">Menu 2</a-menu-item>
                <a-menu-item key="child_3">Menu 3</a-menu-item>
            </a-sub-menu>
        </a-menu>
        <!-- trigger -->
        <template #trigger="{ collapsed }">
            <IconCaretRight v-if="collapsed"></IconCaretRight>
            <IconCaretLeft v-else></IconCaretLeft>
        </template>
    </a-layout-sider>

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