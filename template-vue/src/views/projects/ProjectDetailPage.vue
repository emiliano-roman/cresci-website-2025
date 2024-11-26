<template>
    <div class="content-hero">
      <div id="header-project">
        <figure id="linkItem">
          <img :data-src="project.image" :alt="'Cresci´s - ' + project.title" />
        </figure>
        <div class="hero-caption-project">
          <h2 class="caption-title">{{ project.title }}</h2>
          <div class="hero-caption_bottom">
            <h5>{{ project.order }}</h5>
            <ul class="list-category">
              <li v-for="(category, index) in project.categories || []" :key="index">{{ category }}</li>
            </ul>
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
import { nextTick } from 'vue';
import { pageTransition, updateHeaderTheme, cursorMagic, animationsEfx } from '../../assets/js/scriptsApp.js'; 
import { gsap } from 'gsap';
import projectData from '../../assets/projectsList.json'; 
import { markRaw } from 'vue';
import campTurboProject from './campTurboProject.vue';
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
        'campTurbo': markRaw(campTurboProject),
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
    nextTick(() => {
      animationsEfx();
    });
    // menuSite();
    updateHeaderTheme();
    cursorMagic();
    animationsEfx();
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
      // Aquí puedes agregar lógica para manejar cuando todas las animaciones han terminado
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
#header-project {
    display: flex;
    align-items: center;
    height: 100vh;
    width: 80vw;
    justify-content: center;
    position: relative;
    margin: auto;
}
@media (max-width:1920px) {
  #header-project {
      width: 80vw;
  }
}
/* @media (min-width:1921px) {
    #header-project {
        width: 68vw;
    }
} */
#header-project figure {
    margin: 0 auto;
    display: block;
    overflow: hidden;
    position: relative;
    height: 80vh;
    width: 75vw;
}
#header-project figure img {
    display: block;
    margin: auto;
    width: auto;
    transform: scale(1.1);
}

figure video {
  width: 100%;
  display: block;
}

.hero-caption-project {
    position: absolute;
    z-index: 2;
    bottom: -7vh;
    color: #FFF;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
}
.caption-title {
    position: relative;
    margin: 0;
    font-size: clamp(40px, 11vw, 19rem);
    line-height: 0.9;
    z-index: 9;
    text-transform: uppercase;
}

.hero-caption_bottom {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 10vh;
    justify-content: space-between;
}
.hero-caption_bottom h5 {
    margin: 0;
    font-size: calc(15% + 1vw);
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
    gap: 45px;
    justify-content: center;
}
.list-category li {
    color: #FFF;
    font-size: calc(15% + 1vw);
}

.hero-caption-project .caption-title {
    opacity: 0;
    transform: translateY(150px);
}
.hero-caption_bottom  {
    opacity: 0;
    transform: translateY(150px);
}

@media screen and (min-width: 1921px) and (max-width: 2560px) {
    #header-project {
        width: 80vw;
    }
      #header-project figure img {
        width: 100%;
    }
    .hero-caption-project {
        bottom: 5vh;
    }
  }
</style>
