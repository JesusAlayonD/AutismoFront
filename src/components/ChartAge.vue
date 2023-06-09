<template>
    <Bar
      v-if = "loaded"
      id="my-chart-ids"
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
      

  onMounted(async() => {
      
      const patients = await axios.get(`http://localhost:5001/api/v1/patient/`)
      console.log(patients)
      /* let ages = []
      patients.data.map((row) => {
        console.log(row)
        ages.push(row.patientAge)  
      })
      console.log(ages) */
      let ageC = patients.data.reduce((accumulator, currentObject) => {
          const age = currentObject.patientAge;
          accumulator[age] = (accumulator[age] || 0) + 1;
          return accumulator;
        }, {});
      console.log(ageC)

      
      console.log(Object.keys(ageC))
      chartData.labels = Object.keys(ageC)
      chartData.datasets = [ { label: 'Edad de los pacientes que contestaron' , 
      data: Object.values(ageC),
      backgroundColor: ['#FF00FF']
    } ]   
      loaded.value = true
      
    })
  </script>