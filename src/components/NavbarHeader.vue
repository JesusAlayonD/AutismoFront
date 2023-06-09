<script>
    import { RouterLink } from 'vue-router'
</script>

<template>

        <nav class=" text-blue-700 flex px-6 py-4 border-b md:shadow-lg items-center relative">
            <div class="text-lg font-bold md:py-0 py-4 text-blue-700">
                Test del Especto Autista
            </div>
            <div class="ml-auto md:hidden text-gray-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </div>
        </nav>


</template>

<style>
        @media only screen and (min-width: 768px){
            .parent:hover .child {
                opacity:1;
                height:auto;
                overflow:none;
                transform: translateY(0);
            }
            .child {
                opacity:0;
                height:0;
                overflow:hidden;
                transform: translateY(-10%);
            }
        }
        
    </style>