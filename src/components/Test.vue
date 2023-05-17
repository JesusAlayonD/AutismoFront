<script setup>
    import { ref, computed } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { patientStore } from '../../store/patient.js'

    console.log(patientStore().id)

    const route = useRoute()
    const continueS = ref(false)

    const continueTest = computed(() => {
        if(continueS.value === true){
            return "hidden"
        }
    })

    const handleContinue = () => {
        console.log("Continue test")
        continueS.value = true
    }
</script>

<template>
    <!-- Info Box -->
    <div :class="continueTest">
        <div class="text-3xl font-semibold mb-6 ">
            <span>Reglas del Test</span>
        </div>
        <div class="">
            <div class="text-lg">1.- Aplicar con niños mayores de 3 años.</div>
            <div class="text-lg">2.- Los padres o un tutor designado contestará el test.</div>
            <div class="text-lg">3.- Es importante ser honesto para tener el mejor resultado.</div>
            <div class="text-lg">4.- En caso de obtener algún resultado acudir con su médico.</div>
            <div class="text-lg mt-4">Nota: Este test ayuda a detectar o dar una idea si un niño
                            puede o no tener autismo, es importante acudir a un médico
                            para un diagnóstico más completo.</div>
        </div>
        <div class="flex gap-3 mt-4 justify-end">
            <RouterLink to="/">
                <button type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Salir</button>
            </RouterLink>
            
            <button @click="handleContinue" type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-blue-700 text-white hover:bg-white hover:text-blue-700">Continuar</button>
        </div>
    </div>
</template>