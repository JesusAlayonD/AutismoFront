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
    import moment from 'moment';
  
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
      const conteoPorMes = {};
      patients.data.map((row) => {
        const mes = moment(row.createdAt).format('MMMM');
        if (conteoPorMes[mes]) {
            conteoPorMes[mes]++;
        } else {
            conteoPorMes[mes] = 1;
        }
      })
      const meses = Object.keys(conteoPorMes);
      const cantidadPersonas = Object.values(conteoPorMes);
      
      const mesesEnEspanol = {
        January: "enero",
        February: "febrero",
        March: "marzo",
        April: "abril",
        May: "mayo",
        June: "junio",
        July: "julio",
        August: "agosto",
        September: "septiembre",
        October: "octubre",
        November: "noviembre",
        December: "diciembre"
        };

        const mesesE = meses.map(mes => mesesEnEspanol[mes] || mes);

      chartData.labels = mesesE
      chartData.datasets = [ { label: 'Mes de ingreso de los pacientes' , 
      data: cantidadPersonas,
      backgroundColor: ['#0000FF']
    } ]   
      loaded.value = true
      
    })
  </script>