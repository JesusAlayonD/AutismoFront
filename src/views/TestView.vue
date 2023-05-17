<script setup>
    import { RouterLink } from 'vue-router'
    import Test from "../components/Test.vue";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute()
    
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-blue-700">
        <h1></h1>
        <div class="w-2/6 block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-90">
            <Test/>
        </div>
    </div>

</template>