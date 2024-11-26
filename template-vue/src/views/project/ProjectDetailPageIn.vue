<template>
  <div>
    <div class="content-hero">
      <div id="header-project-in">
        <div class="cs-portfolio-content-in">
          <figure id="linkItem">
            <img class="xl-image" :data-src="project.image" :alt="'Cresci´s - ' + project.title">
          </figure>

          <div class="cs-portfolio-slider-caption psc-center">
            <div class="cs-ps-caption-inner">
              <h2 class="cs-psc-elem cs-ps-caption-title text-uppercase">{{ project.title }}</h2>
            </div>
            <div class="cs-caption-ol">
              <h6 class="cs-psc-elem cs-ps-caption-ol">{{ project.order }}</h6>
            </div>
            <div class="cs-caption-category">
              <ul class="list-category-top">
                <li v-for="(category, index) in project.categories" :key="index">
                  {{ category }}
                </li>
              </ul>
            </div>
            <div class="cs-caption-date">
              <h5 class="cs-psc-elem cs-ps-caption-date">{{ project.date }}</h5>
            </div>
          </div>
        </div>

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

    <!-- Aquí insertamos el componente ProjectsNavSide -->
    <ProjectsNavSide />

    <div>
      <!-- Renderización dinámica del componente basado en el proyecto -->
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
import ProjectsNavSide from '../../components/ProjectsNavSide.vue'; 
import { pageTransition, updateHeaderTheme, cursorMagic, animationsEfx} from '../../assets/js/scriptsApp.js';
import gsap from 'gsap';
import projectData from '../../assets/projectsList.json'; 
import { markRaw } from 'vue'; // Importa markRaw desde Vue
import CampTurboProject from '../projects/CampTurboProject.vue';
import Docusign24Project from '../projects/Docusign24Project.vue';
import Studio7Project from '../projects/Studio7Project.vue'; 
import GoogleProject from '../projects/GoogleProject.vue';
import DpWorldProject from '../projects/DpWorldProject.vue';
import SynapseProject from '../projects/SynapseProject.vue';
import Docusign23Project from '../projects/Docusign23Project.vue';
import PentaProject from '../projects/PentaProject.vue';
import TheSandBoxProject from '../projects/TheSandBoxProject.vue';
import DecodedProject from '../projects/DecodedProject.vue';
import OldGloryProject from '../projects/OldGloryProject.vue'; 
import Sigma17Project from '../projects/Sigma17Project.vue';

export default {
  name: 'ProjectDetailPageIn',
  components: {
    ProjectsNavSide,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      project: {},
      projectComponents: {
        'CampTurbo': markRaw(CampTurboProject),
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
    };
  },
  computed: {
    currentProjectComponent() {
      return this.projectComponents[this.id] || null; // Devuelve el componente correspondiente o null
    },
  },
  mounted() {
    this.loadProjectData();
    pageTransition(this.initAnimations.bind(this)); // Pasa initAnimations al llamar
    // menuSite();
    updateHeaderTheme();
    cursorMagic();
    animationsEfx();
    this.removeBodyClasses(); // Eliminar las clases al cargar el layout
    this.removeContentColor(); // Eliminar las clases al cargar el layout
  },
  methods: {
    loadProjectData() {
      this.project = projectData.projects[this.id] || {}; // Carga los datos del proyecto
    },
    initAnimations() {
      const titleElements = this.getTitleElements();
      const imageElement = this.$el.querySelector("#linkItem img");
      const captionTitleElement = this.$el.querySelector(".hero-caption-project .caption-title");
      const bottomElements = this.$el.querySelectorAll(".hero-caption_bottom");
      const figure = this.$el.querySelector("#linkItem");

      if (this.validateElements([titleElements, imageElement, captionTitleElement, figure])) {
        this.animateTitles(titleElements, imageElement, figure, captionTitleElement, bottomElements);
      } else {
        console.error('No se encontraron algunos elementos para las animaciones.');
      }
    },
    getTitleElements() {
      return [
        this.$el.querySelector("h6"),
        this.$el.querySelector("h2"),
        this.$el.querySelector(".cs-caption-date h5"),
        this.$el.querySelector(".cs-caption-ol h6"),
        this.$el.querySelector(".list-category-top"),
      ];
    },
    validateElements(elements) {
      return elements.every(el => el);
    },
    animateTitles(titleElements, imageElement, figure, captionTitleElement, bottomElements) {
      gsap.to(titleElements, {
        duration: 0.8,
        y: 150,
        delay: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        onComplete: () => {
          this.animateImage(imageElement, figure, captionTitleElement, bottomElements);
        },
      });
    },
    animateImage(imageElement, figure, captionTitleElement, bottomElements) {
      gsap.to(imageElement, {
        duration: 1,
        scale: 1.1,
        ease: "power4.inOut",
      });

      figure.style.clipPath = 'inset(0 0 0 0)';

      gsap.to(figure, {
        duration: 1,
        delay: 0.3,
        width: "75vw",
        height: "80vh",
        scale: 1,
        ease: "power4.inOut",
        onComplete: () => {
          this.animateCaption(captionTitleElement, bottomElements, imageElement);
        },
      });
    },
    animateCaption(captionTitleElement, bottomElements, imageElement) {
      gsap.to([captionTitleElement, ...bottomElements], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.inOut",
      });

      gsap.to(imageElement, {
        duration: 1,
        scale: 1.0,
        opacity: 0.6,
        ease: "power4.inOut",
      });
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
  }
};

</script>



<style scoped>
/* NAV site */
.cs-ol-menu-toggle-btn-text {
  color: #ffffff;
}

/* HERO */
#header-project-in {
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
#header-project-in .cs-ps-caption-title {
  margin: 0;
  font-size: clamp(40px, 9vw, 11rem);
  line-height: .9;
  color: #FFF;
}
#header-project-in .cs-caption-category {
  margin: 3vh 0 0 0;
  right: 0%;
}
#header-project-in figure {
  margin: 0 auto;
  width: 40vw;
  height: 80vh;
  display: block;
  overflow: hidden;
  position: relative;
  clip-path: inset(5% 0% 5% 0%);
  transition: clip-path 1s ease;
}
#header-project-in figure img {
  display: block;
  margin: auto;
  width: auto;
  height: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: fit-content;
  transform: translate(-50%, -50%) scale(1.0);
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
  display: block;
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
  line-height: .9;
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
.list-category-top {
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: center;
}
.list-category-top li {
    color: #FFF;
    font-size: calc(15% + 1vw);
    line-height: 1.2;
}
.hero-caption-project .caption-title {
  opacity: 0;
  transform: translateY(150px);
}
.hero-caption_bottom {
  opacity: 0;
  transform: translateY(150px);
}
</style>
