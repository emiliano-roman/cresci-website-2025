  <template>
    <ProjectsNavSide /> <!-- Aquí insertamos el componente -->
    <div id="ProjectsLayout">
      <router-view /> <!-- Este es el lugar donde se renderiza ProjectDetailPage -->
    </div>
  </template>
  
  <script>
  import ProjectsNavSide from '../components/ProjectsNavSide.vue'; // Ajusta la ruta según la estructura de tu proyecto

  export default {
    name: 'ProjectsLayoutIn',
    components: {
        ProjectsNavSide 
    },
    mounted() {
    },
    methods: {
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del sitio */
  </style>
  