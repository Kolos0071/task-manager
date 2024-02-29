<script setup lang="ts">
import   {type TaskListModelItem,  TaskStatus} from "@/types.ts";
import TaskCard from "@/components/TaskCard.vue";
const taskListModel: TaskListModelItem[] = [
  {
    name: "Новые",
    status: TaskStatus.NEW,
    taskList: []
  },
  {
    name: "В работе",
    status: TaskStatus.PROGRESS,
    taskList: []
  },
  {
    name: "Готово",
    status: TaskStatus.PROGRESS,
    taskList: []
  },
];
</script>

<template>
  <div class="task-page">
      <div v-for="category in taskListModel" :key="category.name" class="task-page__list-wrapper category">
        <h2 class="category__title">{{ category.name }}</h2>
        <ul  class="category__list">
          <li class="category__list-item">
            <TaskCard></TaskCard>
          </li>
        </ul>
      </div>
    </div>
</template>

<style>
  .task-page {
    display: flex;
  }

  .task-page__list-wrapper {
    flex: 0 0 33.33%
  }

  .category__title {
    text-align: center;
  }
  .category__list {
    padding: 12px;
  }
</style>
