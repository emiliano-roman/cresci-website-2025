  <template>
    <ProjectsNavSide />
    <div id="ProjectsLayout">
      <router-view /> <!-- se renderiza ProjectDetailPage -->
    </div>
  </template>
  
  <script>
  import ProjectsNavSide from '../components/ProjectsNavSide.vue'; // Ajusta la ruta según la estructura de tu proyecto

  export default {
    name: 'ProjectsLayout',
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

  </style>
  