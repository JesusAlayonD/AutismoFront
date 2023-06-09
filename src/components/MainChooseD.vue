<script setup>
    import { ref, computed } from "vue";
    import axios from "axios";
    import { onMounted } from 'vue'
    import { patientStore } from '../../store/patient.js'

    onMounted(async() => {
            user.value = await patientStore().data
            if(user.value.doctor){
                choosed.value = true
            } else {
                doctors.value = await axios.get(`http://localhost:5001/api/v1/doctor/`)
                data.value = doctors.value.data
            }
            
        })

    const user = ref({});
    const doctors = ref([]);
    const data = ref([]);
    const choosed = ref(false);

    const showChoose = computed(() => {
        if(choosed.value){
            return "hidden"
        } else {
            return "visible"
        }
    }
    )

    const showText = computed(() => {
        if(choosed.value){
            return "visible"
        } else {
            return "hidden"
        }
    })

    const choose = async(index) => {
        await axios.put(`http://localhost:5001/api/v1/patient/${user.value._id}/doctor`, {
            doctor: data.value[index]._id
        })
        choosed.value = true
        console.log(index)
    }

</script>

<template>
    

    <div :class="showChoose" class="container px-4 flex-grow w-full py-4 sm:py-16 mx-auto mt-10">
      <div class="mx-auto w-full md:w-4/5 px-4">
        <div class="container my-8">
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-6xl font-medium">
              Médicos disponibles
            </h2>
            <div>
            </div>
          </div>
          <div
            id="scrollContainer"
            class="flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8"
            
          >
            <template v-for="(item, index) in data" :key="index">
                <form
              class="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 border rounded-lg"
              @submit.prevent="choose(index)"
            >
              <a href="#" class="space-y-4">
                <div class="px-4 py-2">
                  <div class="text-lg leading-6 font-medium space-y-1">
                    <h3 class="font-bold text-gray-800 text-3xl mb-2">
                      {{ item.name + " " + item.last_name }}
                    </h3>
                  </div>
                  <div class="text-lg">
                    <p class="py-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ad recusandae, consequatur corrupti vel quisquam id itaque
                      nam
                    </p>
                    <p class="pb-4">
                        <span>correo: </span>{{ item.email }}
                    </p>
                    <p class="font-medium text-sm text-indigo-600 mt-2">
                      Leer más<span class="text-indigo-600">&hellip;</span>
                    </p>

                  </div>
                    <div class="flex gap-3 pt-2 mt-4 justify-center">
                        <input type="submit" name="" id="signUp" value="Escoger"
                    class="bg-blue-700 w-16 h-10 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm mt-5">
                    </div>
                </div>
              </a>
                </form>
            </template>
            
          </div>
        </div>
      </div>
    </div>

    <div :class="showText" class="container px-4 flex-grow w-full py-4 sm:py-16 mx-auto m-36">
      <div class=" flex-column mx-auto text-center w-full md:w-4/5 px-4">
        <h1 class="text-6xl pb-12">Se ha registrado con el médico, este se pondrá en contacto con usted por medio de correo electrónico.</h1>
        <h1 class="text-6xl">Agradecemos su participación y esperamos grandes resultados para su tratamiento.</h1>
      </div>
    </div>

</template>