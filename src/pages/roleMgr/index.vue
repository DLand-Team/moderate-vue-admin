<template>
    <div class="content">
        <ActionsBar :handleAction="handleAction" :btnPermission="btnPermission"></ActionsBar>
        <a-table :columns="columns" :data="data">
            <template #optional="{ record }">
                <a-button @click="handleEdit({ title: '编辑', record: record })">编辑</a-button>
            </template>
        </a-table>
        <FormModal :form="formValues" :form-items="formItems!" :title="modalTitle" :handleClose="handleClose"
            :visible="show"></FormModal>
    </div>

</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { BTN_TYPE } from '@/common/components/actionsBar/config'
import { FORM_TYPE } from '@/common/components/formItem/config'
import ActionsBar, { type HandleActionParams } from '@/common/components/actionsBar/index.vue'
import FormModal, { type FormItemT } from '@/common/components/formModal/index.vue'
interface DataItemT {
    id: string,
    name: string,
    signStr: string,
    status: number,
}
const { ADD, EDIT, IMPORT, EXPORT, DELETE } = BTN_TYPE;
const { FORM_SELECT, FORM_INPUT, FORM_TREE } = FORM_TYPE;
const btnPermission = ADD.code | EDIT.code | IMPORT.code | DELETE.code
const modalTitle = ref("")


const formValues: any = ref({})

let formItems = ref<FormItemT[]>()

const handleAction = (params: HandleActionParams) => {
    const { type, payload } = params;
    let fromData: FormItemT[] | null = null
    if (type == ADD.id) {
        fromData = [{
            id: "test1",
            title: "test1",
            type: FORM_SELECT,
            formValue: null,
            span: 12,
            options: {
                selectOptions: [
                    { name: "test1", value: "test1" },
                    { name: "test2", value: "test2" },
                ]
            }
        }]
    }
    fromData && toShowModal({ fromData, title: payload.title })
}

const toShowModal = ({ fromData, title }: { fromData: FormItemT[], title: string }) => {
    formItems.value = fromData;
    modalTitle.value = title;
    show.value = true;
}

const handleClose = () => {
    show.value = false
}
const handleEdit = (data: { title: string, record: DataItemT }) => {
    toShowModal({
        fromData: [
            {
                id: "test1",
                title: "test1",
                type: FORM_SELECT,
                span: 12,
                formValue: null,
                options: {
                    selectOptions: [
                        { name: "test1", value: "test1" },
                        { name: "test2", value: "test2" },
                    ]
                }
            },
            {
                id: "test2",
                title: "test2",
                type: FORM_INPUT,
                span: 12,
                formValue: null
            },
            {
                id: "test3",
                title: "test3",
                type: FORM_TREE,
                span: 24,
                formValue: null
            },
        ],
        title: ''
    })
    modalTitle.value = data.title
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

const data: DataItemT[] = [{
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