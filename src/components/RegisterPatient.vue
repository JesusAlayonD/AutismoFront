<script setup>
    import axios from 'axios';
    import { patientStore } from '../../store/patient.js'
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();

    let name
    let lastName
    let patientName
    let email
    let password
    let sex
    let age

    const register = async() => {
        const data = {
            name: name,
            last_name: lastName,
            patientName: patientName,
            email: email,
            password: password,
            sex: sex,
            patientAge: age
        }

        await patientStore().register(data)

        router.push({ name: "test"})
      }
    
</script>

<template>
                <form action="" v-on:submit.prevent="register">
                <!-- Datos Tutor -->
                <div id="fullName" class="flex flex-row">
                    <!-- first name -->
                    <div id="firstName" class="w-1/2 mr-1">
                        <label for="fname" class="text-sm">Nombre del Tutor</label><br>
                        <input type="text" name="" id="fname" v-model="name"
                            class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                    </div>
                    <!-- last name -->
                    <div id="lastName" class="w-1/2 mr-1">
                        <label for="lname" class="text-sm">Apellidos del Tutor</label><br>
                        <input type="text" name="" id="lname" v-model="lastName"
                            class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                    </div>
                </div>
                <!-- Datos del paciente -->
                <div id="fullName" class="flex flex-row">
                    <!-- first name -->
                    <div id="firstName" class="w-1/2 mr-1">
                        <label for="fname" class="text-sm">Nombre del Paciente</label><br>
                        <input type="text" name="" id="nameP" v-model="patientName"
                            class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                    </div>
                    <!-- last name -->
                    <div id="lastName" class="w-1/2 mr-1">
                        <label for="lname" class="text-sm">Edad del Paciente</label><br>
                        <input type="number" name="" id="ageP" v-model="age"
                            class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                    </div>
                </div>
                
                <!-- email -->
                <label for="email" class="text-sm">Email</label><br>
                <input type="emial" name="" id="email" v-model="email"
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- password -->
                <label for="password" class="text-sm">Contraseña</label><br>
                <input type="password" name="" id="password" v-model="password"
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- confirm password -->
                <label for="confirmPassword" class="text-sm">Confirmar Contraseña</label><br>
                <input type="password" name="" id="confirmPassword" 
                    class="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm">
                <!-- radio buttons for gender -->
                <div id="gender" class="text-sm mb-2">
                    <p class="mt-2">Sexo</p>
                    <input type="radio" name="gender" id="male" class="text-sm mx-1" v-model="sex" value="M"><label for="male">M</label>
                    <input type="radio" name="gender" id="female" class="text-sm mx-1" v-model="sex" value="F"><label for="female">F</label>
                    <input type="radio" name="gender" id="other" class="text-sm mx-1" v-model="sex" value="Other"><label for="other">Other</label>
                </div>
                <!-- Sign up / submit button -->
                <input type="submit" name="" id="signUp" value="Registrarse"
                    class="bg-blue-700 w-full h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm"><br>
                <p class="text-xs my-2">¿Ya tienes una cuenta? <a href="#" class="text-blue-600">Inicia Sesión</a></p>
            </form>
</template>