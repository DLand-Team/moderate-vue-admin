 
<template>
    <a-form-item :field=id :label="title">
        <a-select v-if="type == FORM_SELECT" placeholder="Please select ...">
            <a-option v-for="(item, index) of selectOptions" :key="item.name">
                {{ item.value }}
            </a-option>
        </a-select>
        <a-input v-else-if="type == FORM_DATE_PICKER" v-model="formValue" />
        <a-input v-else-if="type == FORM_TEXTAREA" v-model="formValue" />
        <a-input v-else v-model="formValue" />
    </a-form-item>
</template>
 
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { FORM_TYPE } from './config'
const { FORM_SELECT, FORM_DATE_PICKER, FORM_TEXTAREA } = FORM_TYPE;
const props = defineProps<{ formData: { id:string,title:string,formValue: any, type: string | symbol, options: { selectOptions?: any[] } } }>();
const { formData } = toRefs(props)
debugger
const { formValue, type, options,title,id } = toRefs(formData.value);
const { selectOptions } = toRefs(options.value);

</script>
