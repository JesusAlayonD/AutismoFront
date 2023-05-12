<script setup>
    import { ref } from "vue";
    import RegisterDoctor from "../components/RegisterDoctor.vue";
    import RegisterPatient from "../components/RegisterPatient.vue";
    const type = ref('P')

    
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-slate-200">
        
        <div class="block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-90">
            <h2 class="text-blue-700 text-3xl font-semibold my-4">Registrarse</h2>
            <div id="gender" class="text-sm mb-2 items-center">
            <input type="radio" name="gender" id="male" class="text-sm mx-1" checked v-model="type" value="P"><label for="Paciente">Paciente</label>
            <input type="radio" name="gender" id="female" class="text-sm mx-1" v-model="type" value="M"><label for="Medico">Médico</label>
            </div>
            
            <div v-if="type === 'P'">
                <RegisterPatient/>
            </div>
            <div v-else="type == 'M'">
                <RegisterDoctor/>
            </div>
        </div>
    </div>
</template>