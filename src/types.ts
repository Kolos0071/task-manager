export type TaskListModelItem = {
    name: string;
    status: TaskStatus;
    taskList: Task[];
}

export type Task = {
    id: number;
    status: TaskStatus;
    title: string;
    description: string;
}

export enum TaskStatus {
    NEW,
    PROGRESS,
    DONE
}

export type FormState = {
    title:string;
    description: string;
    isOpen: boolean;
    toggler(): void;
}