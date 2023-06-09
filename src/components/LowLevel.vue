<script setup>
    import { ref, computed } from "vue";
    import axios from "axios";
    import { patientStore } from '../../store/patient.js'


    const reset = async() => {
        user.value = await patientStore().data
        const prueba = await axios.put(`http://localhost:5001/api/v1/patient/delete/${user.value._id}`, {})
        resetStatus.value = true


    }

    const user = ref({});
    const resetStatus = ref(false)

    const resetTest = computed(() => {
        if(resetStatus.value === true){
            return "hidden"
        } else {
            return "visible"
        }
    })

    const resetTestL = computed(() => {
        if(resetStatus.value === true){
            return "visible"
        } else {
            return "hidden"
        }
    })


</script>

<template>
    <div :class="resetTest" >
        <div class="flex text-3xl justify-center font-semibold mb-6 ">
            <span>Gracias por participar</span>
        </div>
        <div class="">
            <div class="flex flex-col justify-center items-center text-center">
                <div class="text-lg">De acuerdo con las respuestas obtenidas el niño/adolescente prestenta:</div>
                <div class="text-lg">Transtorno del espectro autista de nivel <b>LEVE</b></div><br>
                <div class="text-lg"><b>Recomendaciones:</b></div><br>
                <div class="text-lg">Te recomendamos hacer un diagnostico a profundidad, ya que al presentar un nivel de autismo leve pueden pasar desapercibidos varios rasgos
                que definan si el niño/adolescente se encuentra dentro del espectro autista, como lo es el Asperger.</div>
            </div>
        </div>
        <div class="flex gap-3 pt-2 mt-4 justify-center">
            <RouterLink to="/choosedoctor">
                <button type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Continuar</button>
            </RouterLink>
            <button @click="reset" type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Reiniciar Test</button>
        </div>
        
    </div>


    <div :class="resetTestL">
        <div class="flex text-3xl justify-center font-semibold mb-6 text-center">
            <span>Vuelva a iniciar sesión, por favor.</span>
        </div>
        <div class="flex gap-3 pt-2 mt-4 justify-center">
            <RouterLink to="/login">
                <button type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Continuar</button>
            </RouterLink>
        </div>
    </div>
</template>