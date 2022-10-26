<template>
    <a-form-item label-col-flex="50px" :field=id :label="title">
        <a-select v-if="type == FORM_SELECT" placeholder="Please select ...">
            <a-option v-for="(item, index) of formItemOptions" :key="item.name">
                {{ item.value }}
            </a-option>
        </a-select>
        <a-input v-else-if="type == FORM_DATE_PICKER" :v-model="formValue" />
        <a-input v-else-if="type == FORM_TEXTAREA" :v-model="formValue" />
        <TreeFormItem :formItemOptions="formItemOptions" v-else-if="type == FORM_TREE" v-model="formValue" />
        <a-input v-else :v-model="formValue" />
    </a-form-item>
</template>
 
<script setup lang="ts">
import { ref, toRefs, type Ref } from 'vue';
import type { TreeNodeData } from '@arco-design/web-vue';
import { FORM_TYPE } from './config'
import TreeFormItem from './components/tree/index.vue'

export interface FormItemT {
    id: string
    title: string
    type: symbol
    span: number
    formValue?: Ref<unknown>
    options?: {
        selectOptions?: { name: string, value: string }[],
        treeOptions?: TreeNodeData[]
    }
}

const { FORM_SELECT, FORM_DATE_PICKER, FORM_TEXTAREA, FORM_TREE_SELECT, FORM_TREE } = FORM_TYPE;

const props = defineProps<{ formData: FormItemT }>();
const { formData } = toRefs(props)
debugger
const { formValue, type, options, title, id } = toRefs(formData.value);
const formItemOptions = ref()
if (type.value == FORM_SELECT) {
    formItemOptions.value = toRefs(options!.value!).selectOptions!.value
} else if (type.value == FORM_TREE) {
    formItemOptions.value = toRefs(options!.value!).treeOptions!.value
}
</script>
