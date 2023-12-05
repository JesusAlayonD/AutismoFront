<script setup>
    import { ref, computed } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { patientStore } from '../../store/patient.js'
    import { questions } from '../../public/questions.js'
    import NoLevel from "./NoLevel.vue";
    import MinorLevel from "./LowLevel.vue";
    import MediumLevel from "./MediumLevel.vue";
    import HighLevel from "./HighLevel.vue";
    import axios from "axios";
    import { onMounted } from 'vue'

    onMounted(async() => {
        const user = patientStore().data
        if(user.test){
                let data = await axios.get(`http://localhost:5001/api/v1/test/?_id=${user.test}`)
                let testData = data.data[0]
                continueS.value = true
                if(testData.finished){
                    continueR.value = true
                } else {
                    continueR.value = false
                }
                numberQuestion.value = testData.answers.length
                if(testData.answers.length === 23){
                    question.value = questions[22].question
                } else {
                    question.value = questions[testData.answers.length].question
                }
                statusY.value = testData.pointsY
                statusN.value = testData.pointsN
                test = user.test
                
            } 
        }
        

    )
    
    const user = patientStore().data
    let test

    // Check Test
   
    

    const route = useRoute()

    // Info box - Continue
    const continueS = ref(false)
    const continueR = ref(true)


    const continueTest = computed(() => {
        if(continueS.value === true){
            return "hidden"
        }
    })

    const handleContinue = async () => {
        await axios.post("http://localhost:5001/api/v1/test/", { 
                name: user.patientName,
                patient: user._id
            }).then((response) => {
                test = response.data._id;
                axios.put(`http://localhost:5001/api/v1/patient/${user._id}`, { test: test })
            });
        continueS.value = true
        continueR.value = false
    }
    // End Info Box

    // Quiz Box
    const numberQuestion = ref(0)
    const question = ref(questions[numberQuestion.value].question)
    const answer = ref(3)
    const statusY = ref(0)
    const statusN = ref(0)
    const finished = ref(false)
    const result = ref('')

    const blockButtonY = computed(() => {
        if(answer.value === 1){
            return "border-teal-100 bg-teal-100 pointer-events-none"
        } else if (answer.value === 0) {
            return "border-blue-100 bg-blue-50 pointer-events-auto"
        }
    })

    const blockButtonN = computed(() => {
        if(answer.value === 1){
            return "border-blue-100 bg-blue-50 pointer-events-auto"
        } else if (answer.value === 0) {
            return "border-teal-100 bg-teal-100 pointer-events-none"
        }
    })

    const blockButtonNext = computed(() => {
        if(answer.value === 3){
            return "border-teal-100 bg-teal-100 pointer-events-none text-black"
        } else {
            return "border-blue-100 bg-blue-700 pointer-events-auto"
        }
    })

    const continueResult = computed(() => {
        if(continueR.value === true){
            return "hidden"
        }
    })

    const NoLevelR = computed(() => {
        if(numberQuestion.value === 8 || numberQuestion.value === 9) {
            if(statusY.value < statusN.value){
                result.value = 'No detectado'
                finished.value = true
                continueR.value = true
                finishedPush()
                return "visible"
            } else {
                return "hidden"
            }
        } else {
                return "hidden"
            }
    })

    const LowLevelR = computed(() => {
        if(numberQuestion.value === 13  || numberQuestion.value === 14){
            if(statusY.value < statusN.value){
                result.value = 'Leve'
                finished.value = true
                continueR.value = true
                finishedPush()
                return "visible"
            } else {
                return "hidden"
            }
        } else {
                return "hidden"
            }
    })

    const MediumLevelR = computed(() => {
        if(numberQuestion.value === 23  || numberQuestion.value === 24){
            if(statusY.value < statusN.value){
                result.value = 'Moderado'
                finished.value = true
                continueR.value = true
                finishedPush()
                return "visible"
            } else {
                return "hidden"
            }
        } else {
                return "hidden"
            }
    })

    const HighLevelR = computed(() => {
        if(numberQuestion.value === 23){
            if(statusY.value > statusN.value){
                result.value = 'Alto'
                finished.value = true
                continueR.value = true
                finishedPush()
                return "visible"
            } else {
                return "hidden"
            }
        } else {
                return "hidden"
            }
    })

    const finishedPush = async () => {
        if(finished.value) {
        await axios.put(`http://localhost:5001/api/v1/test/${test}`, { 
            result: result.value,
            pointsY: statusY.value,
            pointsN: statusN.value,
            finished: true
        }).then((response) => {
            axios.put(`http://localhost:5001/api/v1/patient/${user._id}`, { result: result.value, finished: true })
          });
    }
    }
    

    const yes = () => {
        answer.value = 1
    }

    const no = () => {
        answer.value = 0
    }


    const handleContinueQuiz = async () => {
        if (answer.value === 1) {
            statusY.value += questions[numberQuestion.value].value
            await axios.put(`http://localhost:5001/api/v1/test/${test}/answers`, { answer: 'si' }).then((response) => {
            axios.put(`http://localhost:5001/api/v1/test/${test}`, 
            { pointsY: statusY.value,
            pointsN: statusN.value, })
          });
        } else {
            statusN.value += questions[numberQuestion.value].value
            await axios.put(`http://localhost:5001/api/v1/test/${test}/answers`, { answer: 'no' }).then((response) => {
            axios.put(`http://localhost:5001/api/v1/test/${test}`, 
            { pointsY: statusY.value,
            pointsN: statusN.value, })
            
          });
        }
        numberQuestion.value ++
        if(numberQuestion.value < 23){
            question.value = questions[numberQuestion.value].question
        }
        answer.value = 3
        
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

    <!-- Test -->
    <div :class="continueResult">
        <div class="text-3xl font-semibold mb-6 ">
            <span>Test del Espectro Autista</span>
        </div>
        <div class="">
            <div class="text-3xl font-semibold pb-5"> {{ question }}</div>
            <div class="flex flex-col">
                <button :class="blockButtonY" class="rounded-md p-3 mb-2 text-left cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 text-1xl font-semibold" @click="yes">Si</button>
                <button :class="blockButtonN" class="rounded-md p-3 mb-2 text-left cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 text-1xl font-semibold" @click="no">No</button>
            </div>
        </div>
        <div class="flex gap-3 mt-4 justify-end">
            
            <button @click="handleContinueQuiz" type="button" :class="blockButtonNext" class="shadow-md p-3 rounded-md transition duration-300 bg-blue-700 text-white hover:bg-white hover:text-blue-700">Siguiente</button>
        </div>
    </div>

    <!-- Result -->
    <div :class="NoLevelR">
        <NoLevel/>
    </div>

    <div :class="LowLevelR">
        <MinorLevel/>
    </div>

    <div :class="MediumLevelR">
        <MediumLevel/>
    </div>

    <div :class="HighLevelR">
        <HighLevel/>
    </div>


</template>