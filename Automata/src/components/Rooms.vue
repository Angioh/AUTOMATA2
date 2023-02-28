<template>
  <div class="salas">Salas</div>
  <button
    class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    @click="modalOn = true"
  >
    Crea una sala
  </button>
  <div>
    <ul v-for="(room, index) in rooms" :key="index">
      <div
        class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2"
      >
        <li>
          <h3>
            {{ room.Sala }}
          </h3>
          <button
            class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2"
            @click="modalDevice(room.Sala)"
          >
            Add
          </button>
          <button
            class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            @click="deleteRoom(room)"
          >
            Delete
          </button>
        </li>
        <h1>Dispositivos:</h1>

        <ul v-for="(device, index) in device.filter((el) => el.room === room.Sala)" :key="index">
          <li>
            <Devices :device="device" />
          </li>
        </ul>
      </div>
    </ul>
  </div>
  <Teleport to="body">
    <div v-if="modalOn" class="modal">
      <div>
        <div>
          <h1>Introduce el nombre de la sala</h1>
        </div>
        <div class="contenido">
          <h1>Nombre Sala</h1>
          <input type="text" v-model="roomName" />
        </div>
        <button
          class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2 mt-2"
          @click="anadeRoom()"
        >
          Agregar
        </button>
        <button
          class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          @click="closeModal()"
        >
          Salir
        </button>
      </div>
    </div>
  </Teleport>
  <Teleport to="body">
    <div v-if="modalSensorOn">
      <div class="modal">
        <div>
          <h1>Introduce los datos dispositivo</h1>
        </div>
        <div>
          <h1>Nombre</h1>
          <input type="text" v-model="name" />
          <h1>Tipo</h1>
          <select name="tipo" id="tipo" v-model="type">
            <option value="Sensor">Sensor</option>
            <option value="Ejecutor">Ejecutor</option>
          </select>
        </div>
        <button
          class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-2 mr-2"
          @click="anadeDevice()"
        >
          aceptar
        </button>
        <button
          class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          @click="closeModal()"
        >
          Cancelar
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { addRoom, onDameRooms, onDameDevices, addDevice, deleteDevice } from '@/API/Firebase'
import { ref, onMounted } from 'vue'
import Devices from '@/components/Devices.vue'

let device = ref([])
let rooms = ref([])
const name = ref('')
const type = ref('')
const roomName = ref('')
const actualRoom = ref('')
const modalSensorOn = ref(false)
const modalOn = ref(false)

const dameRooms = () => {
  onDameRooms('Salas', (docs) => {
    rooms.value = []
    docs.forEach((doc) => {
      rooms.value.push({ id: doc.id, ...doc.data() })
    })
  })
}

const dameDevices = () => {
  onDameDevices('Dispositivos', (docs) => {
    device.value = []
    docs.forEach((disp) => {
      device.value.push({ id: disp.id, ...disp.data() })
    })
  })
}

const anadeRoom = () => {
  if (roomName.value != '') {
    addRoom('Salas', { Sala: roomName.value })
    roomName.value = ''
    closeModal()
  } else {
    alert('El nombre de la sala no puede estar vacío')
  }
}
const deleteRoom = (room) => {
  device.value.map((el) => {
    if (room.Sala == el.room) {
      deleteDevice('Dispositivos', el.id)
    }
  })
  deleteDevice('Salas', room.id)
}

const anadeDevice = () => {
  if (name.value == '') {
    alert('El nombre no puede estar vacío')
  } else if (type.value == '') {
    alert('Seleccione el tipo de dispositivo')
  } else {
    if (type.value == 'Sensor') {
      addDevice('Dispositivos', {
        name: name.value,
        room: actualRoom.value,
        type: type.value,
        value: '10'
      })
      name.value = ''
      type.value = ''
      closeModal()
    } else {
      addDevice('Dispositivos', {
        name: name.value,
        room: actualRoom.value,
        type: type.value,
        value: 'off'
      })
      name.value = ''
      type.value = ''
      closeModal()
    }
  }
}

const modalDevice = (room) => {
  modalSensorOn.value = true
  actualRoom.value = room
}

const closeModal = () => {
  modalOn.value = false
  modalSensorOn.value = false
}
onMounted(() => {
  dameRooms()
  dameDevices()
})
</script>

<style lang="scss" scoped>
.salas {
  margin: 5px 0;
  font-size: xx-large;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: #642590;
  border: 1px solid blue;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  color: gray;
}
h1 {
  font-size: x-large;
}
</style>
