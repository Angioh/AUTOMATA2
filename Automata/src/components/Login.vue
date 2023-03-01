<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p>
      <input type="password" placeholder="Contraseña" v-model="contraseña" @keyup.enter="signIn" />
    </p>
    <p>
      <button
        class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded mt-2"
        @click="signIn"
      >
        Enviar
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const contraseña = ref('')
const router = useRouter()
const signIn = async () => {
  await router.push({ name: 'dashboard' })
}
</script>

<style lang="scss" scoped></style>
