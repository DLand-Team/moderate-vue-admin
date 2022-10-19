<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

watchEffect(() => {
    let keyArr = route.path.slice(1).split('/')
})

</script>
<template>
    <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb>
</template>