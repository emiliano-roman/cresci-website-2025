import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';  // Layout General 
import ProjectsLayout from '../layouts/ProjectsLayout.vue'; // Layout que incluye el NavSide
import ProjectDetailPageIn from '../views/project/ProjectDetailPageIn.vue'; // Detalle del proyecto sin el NavSide


const routes = [
  { path: '/', component: HomePage },  // ruta raíz a HomePage
  { path: '/expertise', component: () => import('../views/ExpertisePage.vue') },
  { path: '/projects', component: () => import('../views/ProjectsPage.vue') }, // Página principal de proyectos
  {
    path: '/projects/:id', // Ruta de detalle del proyecto (con NavSide)
    component: ProjectsLayout, // Layout que incluye el NavSide
    children: [
      {
        path: '', // Ruta que carga por defecto el detalle del project con el sidebar
        component: () => import('../views/projects/ProjectDetailPage.vue'), // Componente que muestra los detalles del proyecto con sidebar
        props: true, // Permite que el id se pase como prop
      },
    ],
  },
  {
    path: '/project/:id', // Ruta de detalle del proyecto sin sidebar
    component: ProjectDetailPageIn, // Componente que muestra el detalle del proyecto sin el sidebar
    props: true,
  },
];

const router = createRouter({
  // history: createWebHistory('/2025/'), // base URL
  history: createWebHistory('/'), // base URL
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; // desplaza hacia arriba
  }
});

export default router;
