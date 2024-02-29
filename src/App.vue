<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header class="header">
      <nav class="header__nav">
        <RouterLink class="header__nav-link" to="/">Главная</RouterLink>
        <RouterLink class="header__nav-link" to="/task">Список задач</RouterLink>
      </nav>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style>
  .header {
    display: flex;
    justify-content: center;
    padding: 12px;
    background-color: #cacaca;
  }

  .header__nav-link {
    font-size: 20px;
    text-decoration: none;
    color: #000;
    border-bottom: 1px solid transparent;
    transition: .3s;
  }

  .header__nav-link:hover {
    border-color: #000;
  }

  .header__nav-link:not(:last-child) {
    margin-right: 12px;
  }

  .router-link-active {
    border-color: #000;
  }
</style>
