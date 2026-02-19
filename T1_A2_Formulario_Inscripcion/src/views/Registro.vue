<template>
  <!-- FORMULARIO -->
  <div class="card p-4 mb-4">
    <h3 class="mb-3 text-primary">
      {{ editando ? 'Editar Alumno' : 'Registro de Alumno' }}
    </h3>

    <form @submit.prevent="guardar">
      <div class="row g-3">

        <!-- NOMBRE -->
        <div class="col-md-4">
          <label class="form-label">Nombre</label>
          <input v-model="alumno.nombre" class="form-control" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">Apellido Paterno</label>
          <input v-model="alumno.apellidoP" class="form-control" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">Apellido Materno</label>
          <input v-model="alumno.apellidoM" class="form-control" required />
        </div>

        <!-- DATOS GENERALES -->
        <div class="col-md-4">
          <label class="form-label">Número de Control</label>
          <input v-model="alumno.control" class="form-control" required />
        </div>

        <div class="col-md-4">
          <label class="form-label">Edad</label>
          <input v-model.number="alumno.edad" type="number" min="17" class="form-control" />
        </div>

        <div class="col-md-4">
          <label class="form-label">Semestre</label>
          <select v-model="alumno.semestre" class="form-select" required>
            <option disabled value="">Seleccione</option>
            <option v-for="n in 14" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <!-- CARRERA -->
        <div class="col-md-6">
          <label class="form-label">Carrera</label>
          <select v-model="alumno.carrera" class="form-select" required>
            <option disabled value="">Seleccione</option>
            <option v-for="c in carreras" :key="c">{{ c }}</option>
          </select>
        </div>

        <!-- MATERIA -->
        <div class="col-md-6">
          <label class="form-label">Materia</label>
          <select v-model="alumno.materia" class="form-select" required>
            <option disabled value="">Seleccione</option>
            <option v-for="m in materias" :key="m">{{ m }}</option>
          </select>
        </div>

        <!-- ESPECIALIDAD -->
        <div class="col-md-6">
          <label class="form-label">Especialidad</label>
          <select v-model="alumno.especialidad" class="form-select">
            <option disabled value="">Seleccione</option>
            <option v-for="e in especialidades" :key="e">{{ e }}</option>
          </select>
        </div>

        <!-- ACTIVIDADES -->
        <div class="col-md-6">
          <label class="form-label">Actividad ExtraEscolares</label>
          <select v-model="alumno.actividad" class="form-select">
            <option disabled value="">Seleccione</option>
            <option v-for="a in actividades" :key="a">{{ a }}</option>
          </select>
        </div>

      </div>

      <button class="btn btn-success mt-4">
        {{ editando ? 'Actualizar Alumno' : 'Registrar Alumno' }}
      </button>
    </form>
  </div>

  <!-- TABLA -->
  
<div class="card p-4">
  <h4 class="text-secondary">Alumnos Registrados</h4>

  <div v-if="alumnos.length" class="table-responsive">
    <table class="table table-bordered table-hover mt-3">
      <thead class="table-dark">
        <tr>
          <th>Control</th>
          <th>Nombre Completo</th>
          <th>Edad</th>
          <th>Semestre</th>
          <th>Carrera</th>
          <th>Materia</th>
          <th>Especialidad</th>
          <th>Actividad</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="a in alumnos" :key="a.control">
          <td>{{ a.control }}</td>
          <td>{{ a.nombre }} {{ a.apellidoP }} {{ a.apellidoM }}</td>
          <td>{{ a.edad }}</td>
          <td>{{ a.semestre }}</td>
          <td>{{ a.carrera }}</td>
          <td>{{ a.materia }}</td>
          <td>{{ a.especialidad }}</td>
          <td>{{ a.actividad }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editar(a)">
              Editar
            </button>
            <button class="btn btn-danger btn-sm" @click="eliminar(a.control)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p v-else class="text-muted mt-3">
    No hay alumnos registrados
  </p>
</div>

</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const editando = ref(false)
const alumnos = ref([])

/* LISTAS */
const carreras = [
  'Ingeniería en Sistemas Computacionales',
  'Ingeniería en Mecatrónica',
  'Ingeniería en Industrias Alimentarias',
  'Licenciatura en Administración',
  'Licenciatura en Contador Público'
]

const materias = [
  'DEVOPS',
  'Tópicos Web',
  'POO',
  'Base de Datos',
  'Estructura de Datos',
  'Graficación',
  'Hacking Ético',
  'Telecomunicaciones'
]

const especialidades = [
  'Tecnologías de la Información',
  'Tecnología Web',
  'Desarrollador de Código',
  'Full Stack'
]

const actividades = [
  'Deportes',
  'Danza',
  'Música',
  'Pintura'
]

/* OBJETO ALUMNO */
const alumno = reactive({
  nombre: '',
  apellidoP: '',
  apellidoM: '',
  control: '',
  edad: '',
  semestre: '',
  carrera: '',
  materia: '',
  especialidad: '',
  actividad: ''
})

onMounted(() => {
  alumnos.value = JSON.parse(localStorage.getItem('alumnos')) || []
})

const guardar = () => {
  if (editando.value) {
    alumnos.value = alumnos.value.map(a =>
      a.control === alumno.control ? { ...alumno } : a
    )
    editando.value = false
  } else {
    alumnos.value.push({ ...alumno })
  }

  localStorage.setItem('alumnos', JSON.stringify(alumnos.value))
  limpiar()
}

const editar = (a) => {
  Object.assign(alumno, a)
  editando.value = true
}

const eliminar = (control) => {
  alumnos.value = alumnos.value.filter(a => a.control !== control)
  localStorage.setItem('alumnos', JSON.stringify(alumnos.value))
}

const limpiar = () => {
  Object.keys(alumno).forEach(k => alumno[k] = '')
}
</script>