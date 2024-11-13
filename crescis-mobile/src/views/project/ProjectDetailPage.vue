<template>
    <div class="content-hero">
      <div id="header-project">
        <figure id="linkItem">
          <div class="background-hero"><img :data-src="project.image" :alt="'Cresci´s - ' + project.title" /></div>
        </figure>
        <div class="hero-caption-project">
          <h2 class="caption-title">{{ project.title }}</h2>
          <div class="hero-caption_bottom">
            <h5>{{ project.order }}</h5>
            <!-- <ul class="list-category">
              <li v-for="(category, index) in project.categories || []" :key="index">{{ category }}</li>
            </ul> -->
            <h5>{{ project.date }}</h5>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div v-if="loading">Cargando proyecto...</div>
      <div v-else>
        <div v-if="currentProjectComponent">
          <component :is="currentProjectComponent"></component>
        </div>
        <div v-else>
          <p>No component available for this project.</p>
        </div>
      </div>
    </div>
</template>

<script>
// import { nextTick } from 'vue';
import { pageTransition, menuSite, navbarFix, updateHeaderTheme } from '../../assets/js/scriptsApp.js'; 
import { gsap } from 'gsap';
import projectData from '../../assets/projectsList.json'; 
import { markRaw } from 'vue';
import Docusign24Project from './Docusign24Project.vue';
import Studio7Project from './Studio7Project.vue'; 
import GoogleProject from './GoogleProject.vue';
import DpWorldProject from './DpWorldProject.vue';
import SynapseProject from './SynapseProject.vue';
import Docusign23Project from './Docusign23Project.vue';
import PentaProject from './PentaProject.vue';
import TheSandBoxProject from './TheSandBoxProject.vue';
import DecodedProject from './DecodedProject.vue';
import OldGloryProject from './OldGloryProject.vue'; 
import Sigma17Project from './Sigma17Project.vue'; 

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      project: {},
      loading: true, // Estado de carga
      projectComponents: {
        'Docusign24': markRaw(Docusign24Project),
        '7Studio': markRaw(Studio7Project),
        'Google': markRaw(GoogleProject),
        'DpWorld': markRaw(DpWorldProject),  
        'Synapse': markRaw(SynapseProject),
        'Docusign23': markRaw(Docusign23Project),
        'Penta': markRaw(PentaProject),
        'TheSandbox': markRaw(TheSandBoxProject),
        'Decoded': markRaw(DecodedProject),
        'OldGlory': markRaw(OldGloryProject),
        '17Sigma': markRaw(Sigma17Project),  
      },
      activeAnimations: 0, // Contador de animaciones activas
    };
  },
  computed: {
    currentProjectComponent() {
      return this.projectComponents[this.id] || null; 
    },
  },
  mounted() {
    this.loadProjectData();
    pageTransition(this.animateProjectElements.bind(this)); // Pasa animateProjectElements al llamar
    menuSite();
    navbarFix();
    updateHeaderTheme();
    // Inicia las animaciones
    this.removeBodyClasses(); // Eliminar las clases al cargar el layout
    this.removeContentColor(); // Eliminar las clases al cargar el layout
  },
  methods: {
    loadProjectData() {
      console.log('ID recibido:', this.id);
      this.project = projectData.projects[this.id] || {};
      this.loading = false; // Actualiza el estado de carga
      console.log('Proyecto cargado:', this.project);
      if (!this.project.title) {
        console.error('Project not found:', this.id);
        // Considera redirigir o mostrar un mensaje de error
      }
    },
    animateProjectElements() {
      // Animación de la imagen en la etiqueta figure
      gsap.to("#linkItem img", {
        onComplete: () => {
          this.activeAnimations--;
          // Animación secundaria para la imagen
          gsap.to("#linkItem img", {
            duration: 1.2,
            scale: 1,
            opacity: 0.6,
            ease: "power4.inOut"
          });
        }
      });

      // Animación de los elementos con la clase hero-caption-project
      gsap.to(".hero-caption-project .caption-title, .hero-caption_bottom", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.4, // Añade un pequeño retraso entre cada elemento
        scrollTrigger: {
          trigger: "#header-project",
          start: "top center", // Ajusta según sea necesario
          onStart: () => {
            this.activeAnimations++;
          },
          onComplete: () => {
            this.activeAnimations--;
            this.checkAnimationsComplete();
          }
        }
      });
    },
    checkAnimationsComplete() {
      // lógica para manejar cuando todas las animaciones han terminado
      if (this.activeAnimations === 0) {
        console.log('Todas las animaciones han terminado');
      }
    },
    removeBodyClasses() {
      const body = document.getElementById('body');
      if (body) {
        body.classList.remove('theme-white'); 
        body.classList.add('theme-dark'); 
      }
    },
    removeContentColor() {
      const contentColor = document.getElementById('contente-z1');
      if (contentColor) {
        contentColor.classList.remove('bg-white'); 
        contentColor.classList.add('bg-dark'); 
      }
    },
  },
};
</script>

<style scoped>
#ProjectsLayout {
    background-color: #15161a;
    z-index: 1;
    position: relative;
}
.cs-ol-menu-toggle-btn-text {
  color: #ffffff;
}
.overflow-hidden {
    overflow: hidden;
}
#cs-header {
    z-index: 99999;
}
#page-header,
#page-content {
    background-color: #15161A;
}
#header-project{
    width: 100%;
    justify-content: center;
    position: relative;
    margin: auto;
}
#header-project figure {
    margin: 0 auto;
    display: block;
    overflow: hidden;
    position: relative;
    height: calc(100vh - 55vh);
    width: 95vw;
    clip-path: none;
}
#header-project figure img {
  display: block;
    margin: auto;
    width: auto;
    position: relative;
    top: -50%;
    left: 0;
    right: 0;
    transform: scale(1.2);
}

.background-hero {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    object-fit: cover;
    z-index: 0;
}


figure video {
  width: 100%;
  display: block;
}

.hero-caption-project {
    color: #FFF;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    flex-direction: column;
    top: calc(100vh - 75vh);
    height: calc(100vh - 97vh);
}
.caption-title{
    position: relative;
    margin: 0;
    font-size: clamp(40px, 13vw, 19rem);
    line-height: 1.5;
    z-index: 9;
    text-transform: uppercase;
}

.hero-caption_bottom {
  display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    justify-content: space-between;
    padding: 0 10px;
}
.hero-caption_bottom h5 {
  margin: 0;
    font-size: calc(15% + 3vw);
}

.col-caption_2 {
    margin: 0 auto;
    text-align: center;
    width: 60%;
}

.list-category {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 15px;
    justify-content: center;
}
.list-category li {
    color: #FFF;
    font-size: calc(15% + 2vw);
}

.hero-caption-project .caption-title {
    opacity: 0;
    transform: translateY(150px);
}
.hero-caption_bottom  {
    opacity: 0;
    transform: translateY(150px);
}
</style>
