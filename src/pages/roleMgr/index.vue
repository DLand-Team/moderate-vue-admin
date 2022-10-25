<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import Table from './components/table/index.vue'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store;

// 变量
const msg = 'Hello Moderate-vue-admin!'
onMounted(() => {
    console.log(123)
})
</script>
        
<template>
    <div class="content">
        <Table></Table>
    </div>
</template>
        
        
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