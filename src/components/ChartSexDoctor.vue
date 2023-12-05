<template>
    <Bar
      v-if = "loaded"
      id="my-chart-id"
      :height="300"
      :widht="600"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import { onMounted } from 'vue'
    import { ref, computed } from "vue";
    import axios from "axios";
    import { doctorStore } from '../../store/doctor.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  

  const m = ref(0);
  const f = ref(0);
  const loaded = ref(false)
  
  let chartData = {
          labels: [],
          datasets: []
        }

  const chartOptions = {
          responsive: true,
          maintainAspectRatio: false
        }
      
        const doctor = ref({});
  onMounted(async() => {
      
      doctor.value = await doctorStore().data
      const patients = await axios.get(`http://localhost:5001/api/v1/patient/?doctor=${doctor.value._id}`)
      patients.data.map((row) => {
        if(row.sex === "M"){
          m.value++;
        } else {
          f.value++;
        }
      })
      chartData.labels = [ 'Masculino', 'Femenino']
      chartData.datasets = [ { label: 'Sexo de los pacientes' , 
      data: [m.value, f.value],
      backgroundColor: ['#0000FF', '#ff0080']
    } ]   
      loaded.value = true
      
    })
  </script>