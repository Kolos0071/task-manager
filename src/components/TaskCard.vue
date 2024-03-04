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
        <button v-if="!noNextButton" @click="$emit('next')" class="task-card__button">-></button>
        <h1 class="task-card__title">{{ title }}</h1>
        <p class="task-card__description">
          {{ description }}
        </p>
    </div>
</template>

<style>
.task-card {
    position: relative;
    padding: 12px;
    background-color: #cacaca;
}

.task-card__button {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translate(0, -50%);
    opacity: 0;
    pointer-events: none;
}

.task-card:hover>.task-card__button, .task-card__button:hover {
    opacity: 1;
    pointer-events: unset;
    cursor: pointer;
}
</style>