 
<template>
    <a-modal v-model:visible="visible" :title="title" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <a-form :model="form">
            <a-row v-for="(childArr, index) in formItemsPro" class="grid-demo" :gutter="24" :key="index">
                <a-col v-for="(cItem, cId) in childArr" class="grid-demo" :span="cItem.span" :key="cId">
                    <FormItem :formData="cItem"></FormItem>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
 
<script setup lang="ts">
import { toRefs, ref, watchEffect, type Ref } from 'vue';
import FormItem,{type FormItemT} from '@/common/components/formItem/index.vue'

const props = defineProps<{ form: any, formItems: FormItemT[], visible: boolean, handleClose: () => void, title: string }>()
const { form, visible, handleClose, title, formItems } = toRefs(props);
const processFormItems = (arr: FormItemT[]) => {
    let result: FormItemT[][] = [];
    let rowId = 0;
    let total = 0
    debugger
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        const { span } = item;
        if ((total * 1 + span * 1) > 24) {
            total = 0;
            rowId++;
        }
        total += span;
        if (!(rowId in result)) {
            result[rowId] = []
        }
        result[rowId].push(item)
        form.value[item.id] = ref()
        item.formValue = form.value[item.id];
    }
    return result
}
const formItemsPro = ref<FormItemT[][]>()
watchEffect(() => {
    if (formItems.value) {
        formItemsPro.value = processFormItems(formItems.value)
    }
})


const handleBeforeOk = (done: ()=>void) => {
    done()
};
const handleCancel = () => {

    handleClose.value()
}
</script>
