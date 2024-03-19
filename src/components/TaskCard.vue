<script lang="ts">

export default {
    props: {
        title: String,
        description: String,
        noNextButton: Boolean
    },
    setup() {
        
    }
}

</script>
<template>
    <div class="task-card">
        <button v-if="!noNextButton" @click="$emit('next')" class="task-card__button task-card__button_next">-></button>
        <h2 class="task-card__title">{{ title }}</h2>
        <p class="task-card__description">
          {{ description }}
        </p>
        <div class="task-card__button-wrapper">
            <button title="Редактировать" class="task-card__button task-card__button_edit" @click="$emit('edit')"></button>
            <button title="Удалить" class="task-card__button task-card__button_delete" @click="$emit('delete')"></button>
        </div>
    </div>
</template>

<style>
.task-card {
    position: relative;
    max-width: 616px;
    padding: 12px;
    background-color: #cacaca;
    border-radius: 12px;
}

.task-card__button-wrapper {
    display: flex;
    align-items: center;
}

.task-card__button {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
}

.task-card__button_delete {
    background-image: url('@/assets/bin.svg');
}

.task-card__button_edit {
    background-image: url('@/assets/edit.svg');
}

.task-card__button_next {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translate(0, -50%);
    opacity: 0;
}

.task-card:hover>.task-card__button, .task-card__button:hover {
    opacity: 1;
    cursor: pointer;
}

.task-card__title {
    margin-bottom: 24px;
    word-wrap: break-word;
}

.task-card__description {
    margin-bottom: 24px;
    word-wrap: break-word;
    white-space: pre-wrap;
}


</style>