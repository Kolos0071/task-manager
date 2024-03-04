<script lang="ts">
export default {
    props: {
        isOpen: Boolean
    }
}
</script>
<template>
    <div :class="{'form_active':isOpen}" class="form">
        <div @click="$emit('close')" class="form__overlay"></div>
        <div class="form__content-wrapper">
            <slot></slot>    
        </div>
    </div>
</template>
<style>
    .form {
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }

    .form_active {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }

    .form__content-wrapper {
        width: 60%;
        height: 40%;
        max-width: 600px;
        max-height: 400px;
        background-color: #fff;
        z-index: 1;
    }
</style> 