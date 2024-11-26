import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';  // Layout General 
import ProjectsDetailLayout from '../layouts/ProjectsDetailLayout.vue'; // Layout Project Detail

const routes = [
  { path: '/', component: HomePage },  // La ruta raíz apunta a HomePage
  { path: '/expertise', component: () => import('../views/ExpertisePage.vue') },
  { path: '/projects', component: () => import('../views/ProjectsPage.vue') }, // Página principal de proyectos
  {
    path: '/project/:id', // Ruta de detalle del proyecto (con NavSide)
    component: ProjectsDetailLayout, // Layout Project Detail
    children: [
      {
        path: '', // Ruta que carga por defecto el detalle del proyecto con el sidebar
        component: () => import('../views/project/ProjectDetailPage.vue'), // Componente que muestra los detalles del proyecto con sidebar
        props: true, // Permite que el id se pase como prop
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory('/2025/m/'), // establecer el base URL aquí
  history: createWebHistory('/m/'), // establecer el base URL aquí
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; // Siempre desplaza hacia arriba
  }
});

export default router;
