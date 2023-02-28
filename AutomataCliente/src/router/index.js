import { createRouter, createWebHistory } from 'vue-router'
import Dispositivos from '../components/Dispositivos.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'Dispositivos',
      component: Dispositivos
    }
  ]
})

export default router
