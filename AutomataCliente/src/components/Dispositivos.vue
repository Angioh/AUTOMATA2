<template>
  <div style="text-align: center">
    <ul v-for="(device, index) in actualDevice" :key="index">
      <div v-if="device.type == 'Sensor'">
        <h1>
          {{ device.name }}
        </h1>
        <h1>Sala: {{ device.room }}</h1>
        <div>
          <h1>{{ device.value }}ºC</h1>

          <div>
            <input v-model="temperature" type="number" />
            <button
              style="margin-left: 30px"
              class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              @click="updateTemperature"
            >
              Cambiar
            </button>
          </div>
        </div>
      </div>
      <div v-if="device.type == 'Ejecutor'">
        <h1>
          {{ device.name }}
        </h1>
        <div>
          <h1>Estado: {{ device.value }}</h1>
          <h1>Sala: {{ device.room }}</h1>
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { onDameDevices, updateDevice } from '@/API/Firebase.js'

const router = useRoute()
const temperature = ref('')
let actualDevice = ref([])

const filterDevice = (id) => {
  onDameDevices('Dispositivos', (docs) => {
    actualDevice.value = []
    docs.forEach((disp) => {
      if (disp.id == id) {
        actualDevice.value.push({ id: disp.id, ...disp.data() })
      }
    })
  })
  console.log(actualDevice)
  console.log(router.params.id)
}

const updateTemperature = () => {
  updateDevice('Dispositivos', router.params.id, { value: temperature.value })
  temperature.value = ''
}

onMounted(() => {
  filterDevice(router.params.id)
})
</script>

<style lang="scss" scoped></style>
