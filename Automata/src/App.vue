<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>AUTOMATA</h1>
  <header>
    <div class="navbar">
      <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-00">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
          <RouterLink :to="{ name: 'home' }">Principal</RouterLink>
          <RouterLink :to="{ name: 'login' }">Iniciar sesión</RouterLink>
          <RouterLink :to="{ name: 'signup' }">Registrarse</RouterLink>
          <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <div class="flex flex-col h-screen my-auto items-center bgimg bg-cover"><RouterView /></div>
</template>

<style scoped>
.navbar {
  padding: 10px;
}
.centrado {
  text-align: center;
}
H1 {
  text-align: center;
  font-size: xx-large;
  font-style: italic;
}
</style>
