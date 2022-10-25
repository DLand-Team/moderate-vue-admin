 
<template>
    <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <a-form :model="form">
            <a-row v-for="(childArr, index) in formItems" class="grid-demo" :gutter="24" :key="index">
                <a-col v-for="(cItem, cId) in childArr" class="grid-demo" :span="cItem.span" :key="cId">
                    <FormItem :formData="cItem"></FormItem>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
 
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { FORM_TYPE } from '@/common/components/formItem/config'
import FormItem from '@/common/components/formItem/index.vue'

const { FORM_SELECT, FORM_INPUT } = FORM_TYPE;
const props = defineProps<{ visible: boolean, handleClose: () => void }>()
const { visible, handleClose } = toRefs(props);


const formValues: any = {}
const processFormItems = (arr: any[]) => {
    let result: any = [];
    let rowId = 0;
    let total = 0
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
        formValues[item.id] = ref()
        item.formValue = formValues[item.id];
    }
    return result
}

const formItems = ref(processFormItems([
    {
        id: "test1",
        title: "test1",
        type: FORM_SELECT,
        span: "12",
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
        span: "12",
        options: {
        }
    },
    {
        id: "test3",
        title: "test3",
        type: FORM_INPUT,
        span: "12",
        options: {
        }
    },
]))

const form = reactive({
    name: '',
    post: ''
});


const handleBeforeOk = (done) => {
    done()
};
const handleCancel = () => {

    handleClose.value()
}
</script>
