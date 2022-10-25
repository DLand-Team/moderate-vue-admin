<template>
    <div class="content">
        <ActionsBar :btnPermission="btnPermission"></ActionsBar>
        <a-table :columns="columns" :data="data">
            <template #optional="{ record }">
                <a-button @click="handleEdit">edit</a-button>
            </template>
        </a-table>
        <FormModal :handleClose="handleClose" :visible="show"></FormModal>
    </div>

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import {BTN_TYPE} from './components/actionsBar/config'
import ActionsBar from './components/actionsBar/index.vue'
import FormModal from '@/common/components/formModal/index.vue'
const btnPermission = 255
const handleClose = () => {
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

<style scoped>
.content {
    color: black;
    height: 100%;
    width: 100%;
}

.title {
    margin-top: 50px;
    font-size: 60px;
    font-weight: bold;
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.info {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-weight: bold;
}
</style>