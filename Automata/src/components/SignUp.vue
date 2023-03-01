<template>
  <div>
    <h1>Crear cuenta</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Contraseña" v-model="contraseña" /></p>
    <button
      class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded mb-2"
      @click="register"
    >
      Registrarse
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// emits

const email = ref('')
const contraseña = ref('')
const router = useRouter()

const register = async () => {
  await router.push({ name: 'dashboard' })
}
</script>

<style lang="scss" scoped></style>
