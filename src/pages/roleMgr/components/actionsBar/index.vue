<template>
    <div>
        <a-row class="content">
            <a-button v-if="btnPermission&BTN_TYPE.ADD" type="primary">add</a-button>
            <a-button v-if="btnPermission&BTN_TYPE.EDIT" type="primary">edit</a-button>
            <a-button v-if="btnPermission&BTN_TYPE.DELETE" type="primary">DELETE</a-button>
            <a-button v-if="btnPermission&BTN_TYPE.IMPORT" type="primary">IMPORT</a-button>
            <a-button v-if="btnPermission&BTN_TYPE.EXPORT" type="primary">EXPORT</a-button>
        </a-row>
    </div>
</template>
  
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import {BTN_TYPE} from './config'

const props = defineProps<{ btnPermission: number }>()
const { btnPermission } = toRefs(props)


</script>

<style scoped>
.content {
    margin-bottom: 12px;
}
</style>