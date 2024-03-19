import { defineStore } from 'pinia'
import { reactive, computed,ref, type ComputedRef, type Ref } from 'vue';
import   {type FormState,  TaskStatus, type Task} from "@/types.ts";
export const useTaskListStore = defineStore('counter', () => {

  const taskList: Ref<Task[]> = ref([{
    id:66,
    title: "NEW CARD",
    status: TaskStatus.NEW,
    description: "Lorem"
  }]);

  (function getItemFromLS() {
    if(window.localStorage.getItem("tm_task-list") && JSON.parse(window.localStorage.getItem("tm_task-list") as string)) {
      taskList.value = JSON.parse(window.localStorage.getItem("tm_task-list") as string);
    } else {
      taskList.value = [{
        id:66,
        title: "NEW CARD",
        status: TaskStatus.NEW,
        description: "Lorem"
      }]
    }
  })()

  function addTask(data:any) {
    const task: Task = {
      title: data.title,
      description: data.description,
      status: TaskStatus.NEW,
      id: taskList.value.length,
    }
    taskList.value.push(task);
    window.localStorage.setItem("tm_task-list", JSON.stringify(taskList.value))
  }

  function changeStatus(card: Task) {
    if(card.status === TaskStatus.NEW) {
     card.status = TaskStatus.PROGRESS;
    } else if(card.status === TaskStatus.PROGRESS) {
     card.status = TaskStatus.DONE;
    }
    window.localStorage.setItem("tm_task-list", JSON.stringify(taskList.value))
   }

   function deleteTask(id:number) {
    const deleteId = taskList.value.findIndex(item=>item.id === id)
    if(deleteId > -1) {
      taskList.value.splice(deleteId,1);
      window.localStorage.setItem("tm_task-list", JSON.stringify(taskList.value))
    }
   }

   function editTask(data: FormState) {
    const editId = taskList.value.findIndex(item=>item.id === data.tempId)
    if(editId > -1) {
      taskList.value[editId].title = data.title;
      taskList.value[editId].description = data.description;
      window.localStorage.setItem("tm_task-list", JSON.stringify(taskList.value))
    }
   }

   
  return {  taskList , addTask, changeStatus, deleteTask, editTask}
})
