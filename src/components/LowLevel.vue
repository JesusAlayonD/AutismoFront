<template>
    <div >
        <div class="flex text-3xl justify-center font-semibold mb-6 ">
            <span>Gracias por participar</span>
        </div>
        <div class="">
            <div class="flex flex-col justify-center items-center text-center">
                <div class="text-lg">De acuerdo con las respuestas obtenidas el niño/adolescente prestenta:</div>
                <div class="text-lg">Transtorno del espectro autista de nivel <b>LEVE</b></div><br>
                <div class="text-lg"><b>Recomendaciones:</b></div><br>
                <div class="text-lg">Te recomendamos hacer un diagnostico a profundidad, ya que al presentar un nivel de autismo leve pueden pasar desapercibidos varios rasgos
                que definan si el niño/adolescente se encuentra dentro del espectro autista, como lo es el Asperger.</div>
            </div>
        </div>
        <div class="flex gap-3 pt-2 mt-4 justify-center">
            <RouterLink to="/choosedoctor">
                <button type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Continuar</button>
            </RouterLink>
            <RouterLink to="/test">
                <button type="button" class="shadow-md p-3 rounded-md transition duration-300 bg-white text-blue-700 hover:bg-blue-700 hover:text-white">Realizar test de nuevo</button>
            </RouterLink>
        </div>
        
    </div>
</template>