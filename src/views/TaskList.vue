<script setup lang="ts">
import { reactive, computed,ref, type ComputedRef, type Ref } from 'vue';
import   {type TaskListModelItem,  TaskStatus, type Task, type FormState} from "@/types.ts";
import TaskCard from "@/components/TaskCard.vue";
import Form from '@/components/Form.vue';
import { useTaskListStore } from '@/stores/taskList'

const store = useTaskListStore()


const taskList: Task[] = store.taskList 

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

  taskList.forEach(item => {
    taskListModel.forEach(category => {
      if(item.status === category.status) {
        category.taskList.push(item);
      }
    })
  })
 

return taskListModel;
})



const formState: Ref<FormState> = ref({
  title: "",
  description: "",
  isOpen: false as boolean,
  isEdit: false as boolean,
  tempId: null as any,
  toggler(isEdit: boolean = false, task: Task) {
    if(isEdit) {
      this.isEdit = isEdit;
      this.title = task.title;
      this.description = task.description;
      this.tempId = task.id
    } else {
      this.title = "";
      this.description = "";
      this.isEdit = false;
    }
    this.isOpen = !this.isOpen;
  }
})

function addTask() {
  store.addTask(formState.value)
  formState.value.title = "";
  formState.value.description = "";
}

function editTask() {
  store.editTask(formState.value)
  formState.value.toggler();
}

function deleteTask(id: number) {
  const answer:boolean = confirm("Хотите удалить задачу?")
  if(answer)store.deleteTask(id)
}

</script>

<template>
  <div class="task-page">
    <Form @close="formState.toggler()" :is-open="formState.isOpen" class="task-page__form">
      <div class="task-page__form-wrapper">
        <h1 v-if="formState.isEdit">Редактировать</h1>
        <h1 v-else>Добавить</h1>
        <input type="text" v-model="formState.title">
        <textarea type="text" v-model="formState.description"></textarea>
        <button v-if="formState.isEdit" @click="editTask">Подтвердить</button>
        <button v-else @click="addTask">Добавить</button>
        <button @click="formState.toggler()">Отмена</button>
      </div>
    </Form>
    <div class="task-page__add-button-wrapper">
      <button class="task-page__add-button" @click="formState.toggler()">Добавить</button>
    </div>
    <div class="task-page__category-wrapper">
      <div v-for="category in taskListModel" :key="category.name" class="task-page__list-wrapper category">
        <h2 class="category__title">{{ category.name }}</h2>
        <ul  class="category__list">
          <li v-for="(card) in category.taskList" class="category__list-item" :key="card.id">
            <TaskCard v-bind="card" :no-next-button="card.status === TaskStatus.DONE" @next="store.changeStatus(card)" @delete="deleteTask(card.id)" @edit="formState.toggler(true, card)"></TaskCard>
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

  .category__list-item:not(:last-child) {
    margin-bottom: 12px;
  }
</style>
