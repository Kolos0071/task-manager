<script setup lang="ts">
import { reactive, computed,ref, type ComputedRef, type Ref } from 'vue';
import   {type TaskListModelItem,  TaskStatus, type Task, type FormState} from "@/types.ts";
import TaskCard from "@/components/TaskCard.vue";
import Form from '@/components/Form.vue';
const taskList: Ref<Task[]> = ref([{
        id:66,
        title: "NEW CARD",
        status: TaskStatus.NEW,
        description: "Lorem"
      }]);

const taskListModel:ComputedRef<TaskListModelItem[]> = computed(()=>{
  const taskListModel =  [
    {
      name: "Новые",
      status: TaskStatus.NEW,
      taskList: [] as Task[]
    },
    {
      name: "В работе",
      status: TaskStatus.PROGRESS,
      taskList: [] as Task[]
    },
    {
      name: "Готово",
      status: TaskStatus.DONE,
      taskList: [] as Task[]
    },
  ];

  taskList.value.forEach(item => {
    taskListModel.forEach(category => {
      if(item.status === category.status) {
        category.taskList.push(item);
      }
    })
  })
 

return taskListModel;
})

function changeStatus(card: Task) {
 if(card.status === TaskStatus.NEW) {
  card.status = TaskStatus.PROGRESS;
 } else if(card.status === TaskStatus.PROGRESS) {
  card.status = TaskStatus.DONE;
 }
}

const formState: Ref<FormState> = ref({
  title: "",
  description: "",
  isOpen: false as boolean,
  toggler() {
    this.isOpen = !this.isOpen;
  }
})

function addTask() {
  const task: Task = {
    title: formState.value.title,
    description: formState.value.description,
    status: TaskStatus.NEW,
    id: taskList.value.length,
  }
  taskList.value.push(task);
  formState.value.title = "";
  formState.value.description = "";

}

</script>

<template>
  <div class="task-page">
    <Form @close="formState.toggler()" :is-open="formState.isOpen" class="task-page__form">
      <div class="task-page__form-wrapper">
        <h1>Add Task</h1>
        <input type="text" v-model="formState.title">
        <input type="text" v-model="formState.description">
        <button @click="addTask">ADD</button>
        <button @click="formState.toggler">Cancel</button>
      </div>
    </Form>
    <div class="task-page__add-button-wrapper">
      <button class="task-page__add-button" @click="formState.toggler">+</button>
    </div>
    <div class="task-page__category-wrapper">
      <div v-for="category in taskListModel" :key="category.name" class="task-page__list-wrapper category">
        <h2 class="category__title">{{ category.name }}</h2>
        <ul  class="category__list">
          <li v-for="(card) in category.taskList" class="category__list-item">
            <TaskCard v-bind="card" :no-next-button="card.status === TaskStatus.DONE" @next="changeStatus(card)"></TaskCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.task-page {
  position: relative;
}

.task-page__add-button-wrapper {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}
  .task-page__category-wrapper {
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
