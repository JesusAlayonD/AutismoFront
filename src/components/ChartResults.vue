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
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  

  const alto = ref(0);
  const moderado = ref(0);
  const leve = ref(0);
  const no = ref(0);
  const noC = ref(0);
  const loaded = ref(false)
  
  let chartData = {
          labels: [],
          datasets: []
        }

  const chartOptions = {
          responsive: true,
          maintainAspectRatio: false
        }
      

  onMounted(async() => {
      
      const patients = await axios.get(`http://localhost:5001/api/v1/patient/`)
      console.log(patients)
      patients.data.map((row) => {
        console.log(row)
        if(row.result === "No detectado"){
          no.value++
        } else if (row.result === "Leve"){
          leve.value++
        } else if (row.result === "Moderado"){
          moderado.value++
        } else if (row.result === "Alto") {
          alto.value++
        } else {
          noC.value++
        }
      })
      chartData.labels = [ 'Alto', 'Moderado', 'Leve', 'No detectado', 'No ha contestado' ]
      chartData.datasets = [ { label: 'Resultados' , 
      data: [alto.value, moderado.value, leve.value, no.value, noC.value],
      backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
    } ]   
      loaded.value = true
      
    })
  </script>