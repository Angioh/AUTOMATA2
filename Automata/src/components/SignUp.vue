<template>
    <div>
        <h1>Crear cuenta</h1>
        <p><input type="text" placeholder="Email" v-model="email"/></p>
        <p><input type="password" placeholder="Contraseña" v-model="contraseña"/></p>
        <p><button @click="register">Registrarse</button></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {useRouter} from 'vue-router'

// emits

    const email = ref('')
    const contraseña = ref('')
    const router = useRouter()

    const register = async () => {
        await createUserWithEmailAndPassword(getAuth(),email.value, contraseña.value)   
        console.log()         
        router.push({name:'dashboard'})
        
    }
</script>

<style lang="scss" scoped>

</style>