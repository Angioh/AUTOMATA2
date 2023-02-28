<template>
  <div>
    <h1>Iniciar Sesión</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Contraseña" v-model="contraseña" 
    @keyup.enter="signIn"/></p>
    <p><button @click="signIn">Enviar</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const email = ref(""); 
const contraseña = ref("");
const router = useRouter();
const signIn = async () => {
        await signInWithEmailAndPassword(getAuth(),email.value, contraseña.value)   
        console.log('Inicio correctamente')         
        router.push({name:'dashboard'})
        
    }
</script>

<style lang="scss" scoped></style>
