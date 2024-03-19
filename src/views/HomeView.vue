<script setup lang="ts">
import { useTaskListStore } from '@/stores/taskList'
import { TaskStatus } from '@/types';
import { computed } from 'vue';
import Chart from '@/components/Chart.vue'

const store = useTaskListStore()

    const colorScheme = {
        [TaskStatus.NEW]: "yellow",
        [TaskStatus.PROGRESS]: "blue",
        [TaskStatus.DONE]: "green",
    }
    const paths = computed(()=>{
        return [
        {
            weight: store.$state.taskList.filter(item=>item.status === TaskStatus.NEW).length? store.$state.taskList.filter(item=>item.status === TaskStatus.NEW).length: 0,
            color: colorScheme[TaskStatus.NEW],
            description: "Новые"
        },
        {
            weight: store.$state.taskList.filter(item=>item.status === TaskStatus.PROGRESS).length? store.$state.taskList.filter(item=>item.status === TaskStatus.PROGRESS).length: 0,
            color: colorScheme[TaskStatus.PROGRESS],
            description: "В работе"
        },
        {
            weight: store.$state.taskList.filter(item=>item.status === TaskStatus.DONE).length? store.$state.taskList.filter(item=>item.status === TaskStatus.DONE).length: 0,
            color: colorScheme[TaskStatus.DONE],
            description: "Готовые"
        }
    ]
       
})

</script>

<template>
    <div class="homepage">
        <h1 class="homepage__title">Статистика</h1>
        <Chart class="homepage__chart" isDonut :radius="200" :value="paths"></Chart>
        <ul class="homepage__legend legend-list">
            <li class="legend-list__item"  v-for="(item, index) in paths" :key="index">
                <svg class="legend-list__item-marker" width="50" height="50" viewBox="50px 50px">
                    <circle  r="50%" cx="50%" cy="50%" :fill="item.color">
                    </circle>
                    <text x="50%" y="50%" text-anchor="middle" stroke="#000"  stroke-width="2px" dy=".3em">{{ item.weight }}</text>
                 </svg> 
                 <span>
                   <b> {{ item.description }} </b>
                 </span>
            </li>
        </ul>
    </div>
</template>

<style>
.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.homepage__chart {
    width: 30%;
    height: 30%;
}

.homepage__legend {
    
}

.legend-list__item {
    display: flex;
    align-items: center;
}

.legend-list__item:not(:last-child) {
    margin-bottom: 12px;
}

.legend-list__item-marker {

    margin-right: 12px;
}
</style>
