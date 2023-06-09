<script setup>
  import NavbarHeader from "../components/NavbarHeader.vue"
  import AdminTablePatients from "../components/AdminTablePatients.vue";
  import AdminTableDoctor from "../components/AdminTableDoctor.vue";
</script>

<template>
  <NavbarHeader/>
  <div class="min-h-screen bg-white font-InstrumentSans">
    <div class="header text-center">
    <h1 class="text-6xl font-bold text-blue-700 pt-10">Información General</h1>
  </div>
    <AdminTablePatients/>
    <AdminTableDoctor/>
  </div>   
 
</template>