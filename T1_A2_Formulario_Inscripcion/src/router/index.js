import { createRouter, createWebHistory } from 'vue-router'
import Registro from '../views/Registro.vue'
import Lista from '../views/Lista.vue'

const routes = [
  { path: '/', component: Registro },
  { path: '/lista', component: Lista }
]

export default createRouter({
  history: createWebHistory(),
  routes
})