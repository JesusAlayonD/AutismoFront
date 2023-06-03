<script setup>
    import axios from 'axios';
    import { doctorStore } from '../../store/doctor.js'
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();

    let email
    let password

    const login = async() => {
        const data = {
            email: email,
            password: password
        }

        await doctorStore().login(data)

        router.push({ name: "patientsInfo"})
      }
</script>

<template>
                <form action="" v-on:submit.prevent="login">

                <!-- email -->
                <label for="email" class="text-sm">Email</label><br>
                <input type="email" name="" id="email" v-model="email"
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- password -->
                <label for="password" class="text-sm">Contraseña</label><br>
                <input type="password" name="" id="password" v-model="password"
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- Sign up / submit button -->
                <input type="submit" name="" id="signUp" value="Login"
                    class="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm mt-5"><br>
            </form>
</template>