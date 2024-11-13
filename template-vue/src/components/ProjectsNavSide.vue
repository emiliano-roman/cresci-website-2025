<template>
  <div id="sidebarNav" class="cs-ps-nav-pagination cs-ps-nav-list-in">
    <a
      v-for="(project, index) in projects"
      :key="index"
      class="link-list"
      :class="{ 'active-link': isActive(project.route) }"
      @click.prevent="navigateTo(project)"
    >
      {{ project.name }}
    </a>
  </div>
</template>

<script>
import { pageTransition } from '../assets/js/scriptsApp.js';

export default {
  name: 'ProjectsNavSide',
  data() {
    return {
      projects: [
        { name: 'WILLOW', route: '/project/Willow', external: 'https://cresci.co/willow' },
        { name: 'SALESFORCE', route: '/project/Salesforce', external: 'https://cresci.co/salesforce' },
        { name: 'DOCUSIGN 24\'', route: '/project/Docusign24' },
        { name: '7 STUDIO', route: '/project/7Studio' },
        { name: 'GOOGLE', route: '/project/Google' },
        { name: 'DP WORLD', route: '/project/DpWorld' },
        { name: 'SYNAPSE', route: '/project/Synapse' },
        { name: 'DOCUSIGN 23\'', route: '/project/Docusign23' },
        { name: 'PENTA', route: '/project/Penta' },
        { name: 'THE SANDBOX', route: '/project/TheSandbox' },
        { name: 'DECODED', route: '/project/Decoded' },
        { name: 'OLD GLORY', route: '/project/OldGlory' },
        { name: '17SIGMA', route: '/project/17Sigma' },
      ],
    };
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    navigateTo(project) {
      // Si es un enlace externo, abrir en nueva pestaña
      if (project.external) {
        window.open(project.external, '_blank');
      } else {
        // Ejecutar la transición de página
        pageTransition();

        // Esperar a que la transición termine antes de navegar
        setTimeout(() => {
          this.$router.push(project.route);
        }, 1000); // Ajusta el tiempo si la transición dura más de 1 segundo
      }
    },
    handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.4;

      const sidebarNav = document.getElementById('sidebarNav');
      if (scrollTop >= threshold) {
        sidebarNav.classList.add('hidden-navbar');
      } else {
        sidebarNav.classList.remove('hidden-navbar');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
#sidebarNav a {
    cursor: pointer;
}
#sidebarNav.cs-ps-nav-list-in {
  position: fixed;
  left: 1.5vw;
  transform: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  top: 13vh;
  z-index: 9;
  transition: opacity 0.5s ease; /* Duración y suavidad de la transición */
}

#sidebarNav.hidden-navbar {
  opacity: 0; /* Oculta la barra lateral */
  position: absolute;
  z-index: -99999;
}

.cs-ps-nav-list-in .link-list {
  display: inline-block;
  width: auto;
  opacity: 1;
  color: #939393;
  font-size: 0.914rem;
  line-height: 1.53;
  transition: color 1s;
}
.cs-ps-nav-list-in .link-list:hover,
.cs-ps-nav-list-in .link-list.active-link {
  color: #fff;
}
</style>
