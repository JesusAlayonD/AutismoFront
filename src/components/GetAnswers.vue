<script setup>
    import { ref, computed } from "vue";
    import axios from "axios";
    import { onMounted } from 'vue'
    import { patientStore } from '../../store/patient.js'
    import { questions } from '../../public/questions.js'
    import pdfMake from "pdfmake/build/pdfmake";
    import pdfFonts from "pdfmake/build/vfs_fonts";
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    onMounted(async() => {
            user.value = await patientStore().data
            test.value = await axios.get(`http://localhost:5001/api/v1/test/?_id=${user.value.test}`)
            answers.value = test.value.data[0].answers
            
        })
    const user = ref({});
    const test = ref({});
    const answers = ref([]);

    const animals = [
        ['Pregunta', 'Respuesta']
      ]
    const exportPdf = () => {
        let data = [
        [ 'Pregunta', 'Respuesta']
        ]
        answers.value.map((row, index) => {
            data.push([questions[index].question, row])
        })

      let docDefinition = {
        content: [
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto' ],

        body: data
      }
    }
  ]
      };
      const pdf = pdfMake.createPdf(docDefinition)
      pdf.download()
    }



</script>

<template>
    <div class="flex flex-col items-center mb-20">
        <div class="flex flex-col gap-7 mb-10 justify-center">
            <h1 class="text-4xl text-blue-700">Respuestas de las Preguntas</h1>
            <div class="flex items-center justify-center">
                <button @click="exportPdf()" type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-blue-700 text-white hover:bg-white hover:text-blue-700">Descargar Preguntas</button>
            </div>
        </div>
        <div class="border rounded-lg item-center w-2/3">
            <table class="">
                <thead>
                <tr>
                <th class="py-2 px-4 border-b border-r">Pregunta</th>
                <th class="py-2 px-4 border-b">Respuesta</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in answers" :key="index">
                <tr>
                <td class="py-2 px-4 border-b border-r">{{ questions[index].question }}</td>
                <td class="py-2 px-10 border-b">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    
</template>