<template>
    <a-table :columns="columns" :data="data">
        <template #optional="{ record }">
            <a-button @click="handleEdit">view</a-button>
        </template>
    </a-table>
    <FormModal :handleClose="handleClose"  :visible="show"></FormModal>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import FormModal from '../formModal/index.vue'
const handleClose = ()=>{
    debugger
    show.value = false
}
const handleEdit = () => {
    show.value = true
}
const show = ref(false)
const columns = [{
    title: '角色编号',
    dataIndex: 'id',
}, {
    title: '角色名称',
    dataIndex: 'name',
}, {
    title: '权限字符',
    dataIndex: 'signStr',
}, {
    title: '状态',
    dataIndex: 'status',
}, {
    title: '操作',
    slotName: 'optional'
}];

const data = [{
    id: '1',
    name: '超级管理员',
    signStr: 'admin',
    status: 1,
}, {
    id: '2',
    name: '普通角色',
    signStr: 'normal',
    status: 1,
}];
</script>