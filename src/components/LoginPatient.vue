<script setup>
    import axios from 'axios';
    import { ref, computed } from "vue";
    import { patientStore } from '../../store/patient.js'
    import { useRoute, useRouter } from "vue-router";
    
    

    const router = useRouter();
    let email
    let password
    const error = ref(false)
    
    const login = async() => {
        const data = {
            email: email,
            password: password
        }

        await patientStore().login(data)

        if (patientStore().data.name) {
            router.push({ name: "test"})
        } else {
            error.value = true
        }
        
      }
    
      const errorHandle = computed(() => {
        if(error.value){
            return "visible"
        }else{
            return "hidden"
        }
    })

</script>

<template>
                <form action="" @submit.prevent="login">

                <!-- email -->
                <label for="email" class="text-sm">Email</label><br>
                <input type="email" name="" id="email" v-model="email"
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- password -->
                <label for="password" class="text-sm">Contraseña</label><br>
                <input type="password" name="" id="password" v-model="password"
                    class="mb-4 h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                    <div :class="errorHandle" class="text-sm bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span class="block sm:inline">El correo o la contraseña son incorrectos.</span>
                    </div>
                <!-- Sign up / submit button -->

                <input type="submit" name="" id="signUp" value="Login"
                    class="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm mt-5"><br>
                
            </form>
</template>