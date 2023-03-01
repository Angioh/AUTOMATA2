<template>
  <div @click="changeTemp(device.id)">
    {{ device.name }}
  </div>
  <div>
    <p v-if="device.type == 'Sensor'">Temperatura: {{ device.value }} ºC</p>
    <div v-if="device.type == 'Ejecutor'">
      <p>Estado: {{ device.value }}</p>
      <button
        class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded mb-2"
        @click="changeState(device)"
      >
        Cambiar estado
      </button>
    </div>
    <button
      class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      @click="deleteDev(device)"
    >
      Eliminar
    </button>
  </div>
</template>

<script setup>
import { updateDevice, deleteDevice } from '@/API/Firebase'

const prop = defineProps({
  device: Object
})
//Cambio el estado del ejecutor
const changeState = (device) => {
  device.value == 'off'
    ? updateDevice('Dispositivos', device.id, { value: 'on' })
    : updateDevice('Dispositivos', device.id, { value: 'off' })
  console.log(device.id)
}
//abro la siguiente app al tratar de cambiar la temperatura
const changeTemp = (id) => {
  window.open(`http://localhost:5173/${id}`)
}

//Elimino un dispositivo
const deleteDev = (device) => {
  deleteDevice('Dispositivos', device.id)
}
</script>

<style lang="scss" scoped></style>
