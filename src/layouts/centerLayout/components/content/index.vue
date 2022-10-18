<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
        
<template>
    <a-layout  style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content >
            <RouterView></RouterView>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</template>
        
        
<style scoped>
.content{
    color: black;
}
</style>