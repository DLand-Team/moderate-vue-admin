 
<template>
    <a-modal v-model:visible="visible" title="Modal Form" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <a-form :model="form">
            <a-form-item field="name" label="Name">
                <a-input v-model="form.name" />
            </a-form-item>
            <a-form-item field="post" label="Post">
                <a-select v-model="form.post">
                    <a-option value="post1">Post1</a-option>
                    <a-option value="post2">Post2</a-option>
                    <a-option value="post3">Post3</a-option>
                    <a-option value="post4">Post4</a-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
 
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';

const props = defineProps<{ visible: boolean,handleClose:()=>void }>()
const { visible,handleClose } = toRefs(props);

const form = reactive({
    name: '',
    post: ''
});


const handleBeforeOk = (done) => {
    done()
};
const handleCancel = () => {
    debugger
    handleClose.value()
}
</script>
