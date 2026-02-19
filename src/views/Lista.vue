<template>
  <div class="card p-4">
    <h3>Listado de Alumnos</h3>

    <table class="table table-striped" v-if="alumnos.length">
      <thead>
        <tr>
          <th>Control</th>
          <th>Nombre</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="a in alumnos" :key="a.control">
          <td>{{ a.control }}</td>
          <td>{{ a.nombre }}</td>
          <td>{{ a.carrera }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editar(a)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminar(a.control)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No hay alumnos registrados</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const alumnos = ref([])

onMounted(() => {
  alumnos.value = JSON.parse(localStorage.getItem('alumnos')) || []
})

const eliminar = (control) => {
  alumnos.value = alumnos.value.filter(a => a.control !== control)
  localStorage.setItem('alumnos', JSON.stringify(alumnos.value))
}

const editar = (alumno) => {
  localStorage.setItem('editar', JSON.stringify(alumno))
  router.push('/')
}
</script>