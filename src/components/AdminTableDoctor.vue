<script setup>
  import { ref, computed } from "vue";
    import axios from "axios";
    import { onMounted } from 'vue'
    import { doctorStore } from '../../store/doctor.js'

    onMounted(async() => {
            doctors.value = await axios.get(`http://localhost:5001/api/v1/doctor/`)
            doctors.value = doctors.value.data   

            
        })

        const doctors = ref({});

    const order = async(orderBy) => {
      doctors.value = doctors.value.sort(compare(orderBy))
    }

    const orderDate = async() => {
      doctors.value = doctors.value.sort(compareByDate);
    }

    const orderAge = async() => {
      doctors.value = doctors.value.sort(compareByAge);
    }



    function compare(variable) {
      return function(a, b) {
        const valorA = a[variable].toUpperCase();
        const valorB = b[variable].toUpperCase();

        if (valorA < valorB) {
          return -1;
        }
        if (valorA > valorB) {
          return 1;
        }
        return 0;
      };
    }

    function compareByDate(a, b) {
      const fechaA = new Date(a.createdAt);
      const fechaB = new Date(b.createdAt);

      return fechaA - fechaB;
    }

    function compareByAge(a, b) {
      return a.age - b.age;
    }
</script>

<template>
    <section class="py-1 bg-blueGray-50">
<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-blueGray-700">Doctores</h3>
        </div>

      </div>
    </div>

    <div class="block w-full overflow-x-auto max-h-80 overflow-y-auto">
      <table class="items-center bg-transparent w-full border-collapse ">
        <thead>
          
          <tr >
            <th @click="order('name')" class="cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Nombre
                        </th>
           <th @click="order('email')" class="cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Email
                        </th>
          <th @click="orderAge" class="cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Edad
                        </th>
            <th @click="order('sex')" class="cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Sexo
                        </th>
          <th @click="orderDate" class="cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Fecha de Registro
                        </th>
          </tr>
          
        </thead>

        <tbody>
          <template v-for="(item, index) in doctors" :key="index">
            <tr>
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
              {{ item.name }}
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ item.email }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
              {{ item.age }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
              {{ item.sex }}
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
              {{ item.createdAt.split("T")[0] }}
            </td>
          </tr>
          </template>
        </tbody>

      </table>
    </div>
  </div>
</div>
</section>
</template>