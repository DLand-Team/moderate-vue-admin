 
<template>
    <a-form-item label-col-flex="50px" :field=id :label="title">
        <a-select v-if="type == FORM_SELECT" placeholder="Please select ...">
            <a-option v-for="(item, index) of selectOptions" :key="item.name">
                {{ item.value }}
            </a-option>
        </a-select>
        <a-input v-else-if="type == FORM_DATE_PICKER" v-model="formValue" />
        <a-input v-else-if="type == FORM_TEXTAREA" v-model="formValue" />
        <TreeFormItem v-else-if="type == FORM_TREE" v-model="formValue" />
        <a-input v-else v-model="formValue" />
    </a-form-item>
</template>
 
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { FORM_TYPE } from './config'
import TreeFormItem from './components/tree/index.vue'
const { FORM_SELECT, FORM_DATE_PICKER, FORM_TEXTAREA, FORM_TREE_SELECT, FORM_TREE } = FORM_TYPE;

const props = defineProps<{ formData: any }>();
const { formData } = toRefs(props)
const { formValue, type, options, title, id } = toRefs(formData.value);
const selectOptions = ref()
if (type.value == FORM_SELECT) {
    selectOptions.value = toRefs(options.value).selectOptions.value
}

</script>
